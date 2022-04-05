import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import regions from '../../Components/files/regions'
// import dynamic from 'next/dynamic'
import Header from '../../Components/header'
import Footer from '../../Components/footer'
import Dadata from '../../Components/dadata'
import MkdReestr from '../../Components/mkd-reestr'
// import Scroll from '../Components/scroll'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default function Object({mkd, jkh}) {
  const mkdHouse = JSON.parse(mkd)
  const jkhInfo = JSON.parse(jkh)
  const addressMkd = mkdHouse.address
  const okato = mkdHouse.okato
  const oktmo = mkdHouse.oktmo
  const postalCode = mkdHouse.postalcode
  const title = `Проверка многоквартирного дома по адресу: ${addressMkd} на карте | ОКАТО: ${okato}, ОКТМО: ${oktmo}, Индекс: ${postalCode}`
  const title2 = `${addressMkd} - проверка многоквартирного дома | ${addressMkd} на карте`
  return (
    <>
      <Meta
        title={okato ? title : title2}
        descritoin={`Информация о многоквартином доме, расположенного по адресу ${addressMkd}. Физический износ, оценочная стоимость, инфраструктура`}
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
              <Dadata />
              <div className="object__wrap">
                {/* <MenuLeft cadastrObj={cadastralObject} askAboutFlat={askAboutFlat} jkhObj={jkh || null}/> */}
                <div className="object__contentWrap">
                  <div className="object__content">
                    <MkdReestr mkdObj={mkd} jkhObj={jkh}/>
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
  const regionBase = client.db('dataHousePassports')
  const regionCollection = regionBase.collection(`${searchRegions}`)
  const mkdsearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const mkd = mkdsearch[0]
  const mkdAddress = mkd.address
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  if (mkdAddress) {
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
      .then(({ data }) => {
        return data
      })
      .catch((e) => {
        console.log('ERROR_FIND_SOCIAL', e)
        return res.json({ error: 'Мы не смогли получить информацию, попробуйте произвести поиск еще раз' })
      })
    console.log('ЗАПРОС', getAskDadata)
    // const db = client.db('dataHousePassports')
    // const collection = db.collection(`${searchRegions}`)
    // await collection.updateOne({'houseguid':houseFiasCode}, { $set: {postalcode, lat, lon, oktmo, okato}}, { upsert: false })
    //  res.json(getAskDadata)
  }

  console.log('ДОМИШКО', mkd)

  const jkhCompanyId = mkdsearch?.[0]?.management_organization_id
  const jkhBase = regionBase.collection('JKHBase')
  const company = await jkhBase.find({id: jkhCompanyId}).toArray()
  const companyJkh = company[0]
    return {
      props: {mkd: JSON.stringify(mkd), jkh: JSON.stringify(companyJkh) || null}
    }
}