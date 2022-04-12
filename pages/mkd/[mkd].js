import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import regions from '../../Components/files/regions'
import SeoMenu from '../../Components/seoMenu'
import Breadcrumbs from '../../Components/breadcrumbs'
import Header from '../../Components/header'
import RandomMkdObjects from '../../Components/randomMkdObjects'
import Footer from '../../Components/footer'
// import MkdMap from '../../Components/mkdMap'
import Dadata from '../../Components/dadata'
import MkdReestr from '../../Components/mkd-reestr'
import dynamic from 'next/dynamic'
const DynamicMkdMap = dynamic(
  () => import('../../Components/mkdMap'),
  { ssr: true }
)
// import Scroll from '../Components/scroll'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default function Object({mkd, jkh}) {
  const mkdHouse = JSON.parse(mkd)
  const addressMkd = mkdHouse.address
  const okato = mkdHouse.okato
  const oktmo = mkdHouse.oktmo
  const postalCode = mkdHouse.postalCode
  const title = `Многоквартирный дом на карте по адресу: ${postalCode}, ${addressMkd}, ОКАТО: ${okato}, ОКТМО: ${oktmo}`
  const title2 = `${addressMkd} - проверка многоквартирного дома | ${addressMkd} на карте`
  return (
    <>
      <Meta
        title={okato ? title : title2}
        descritoin={`Информация о многоквартирном доме, расположенного по адресу ${addressMkd}. Физический износ, количество квартир, адрес управляющей компании ЖКХ`}
        keywords={`${addressMkd}, индекс, окато, ОКТМО`}
      />
      <div className="first">
        <Header />
        <div className="header__loader">
          <div className="header__loader-progress"> </div>
        </div>
        <section content-main="">
          <div className="object">
            <div className="content">
              <Breadcrumbs cadastrObj={mkd}/>
              <Dadata />
              <div className="object__wrap">
                <SeoMenu />
                {/* <MenuLeft cadastrObj={cadastralObject} askAboutFlat={askAboutFlat} jkhObj={jkh || null}/> */}
                <div className="object__contentWrap">
                  <div className="object__content">
                    <MkdReestr mkdObj={mkd} jkhObj={jkh}/>
                    <DynamicMkdMap mkd={mkd}/>
                    <RandomMkdObjects />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const fiasNumbers = context.params.mkd
  await client.connect()
  const splitNumbers = fiasNumbers.split('-mkd-')
  const regionFiasCode = splitNumbers[0]
  const houseFiasCode = splitNumbers[1]

  const searchRegions = regions[regionFiasCode]
  const regionBase = client.db(process.env.MONGO_COLLECTION)
  const regionCollection = regionBase.collection(`${searchRegions}`)
  const mkdsearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const mkd = mkdsearch[0]
  if (!mkd) {
    return {
      notFound: true
    }
  }
  const mkdAddress = mkd?.address
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  const getAskDadata = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 70b8dda637580dd14625d9296f24945f2a6fc4f9',
        'Host': 'suggestions.dadata.ru',
      },
      url: encodeURI(url),
      data: {query: mkdAddress, 'count':10}
    })

  const okato = getAskDadata.data?.suggestions[0]?.data?.okato
  const oktmo = getAskDadata.data?.suggestions[0]?.data?.oktmo
  const postalCode = getAskDadata?.data?.suggestions[0]?.data?.postal_code
  const lat = getAskDadata.data?.suggestions[0]?.data?.geo_lat
  const lon = getAskDadata.data?.suggestions[0]?.data?.geo_lon

  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection(`${searchRegions}`)
  await collection.updateOne({'houseguid':houseFiasCode}, { $set: {postalCode, lat, lon, oktmo, okato}}, { upsert: false })
  const mkdNewSearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const newMkd = mkdNewSearch[0]
  const jkhCompanyId = mkdsearch?.[0]?.management_organization_id
  const jkhBase = regionBase.collection('JKHBase')
  const company = await jkhBase.find({id: jkhCompanyId}).toArray()
  const companyJkh = company[0]
  
    return {
      props: {mkd: JSON.stringify(newMkd), jkh: JSON.stringify(companyJkh) || null}
    }
}