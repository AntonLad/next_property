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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const DynamicMkdMap = dynamic(
  () => import('../../Components/mkdMap'),
  { ssr: true }
)
// import Scroll from '../Components/scroll'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default function Object({mkd, jkh, flats}) {
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

  // получаем данные из URL в виде фиас кода региона и мкд
  const fiasNumbers = context.params.mkd
  await client.connect()
  const splitNumbers = fiasNumbers.split('-mkd-')
  const regionFiasCode = splitNumbers[0]
  const houseFiasCode = splitNumbers[1]

  // подключаемся к базе и ищем мкд по фиас коду
  const searchRegions = regions[regionFiasCode]
  const regionBase = client.db(process.env.MONGO_COLLECTION)
  const regionCollection = regionBase.collection(`${searchRegions}`)
  const mkdsearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const mkd = mkdsearch[0]

  // если мкд не найден, возвращаем 404 ошибку
  if (!mkd) {
    return {
      notFound: true
    }
  }

  //отправляем в дадату адрес объекта, чтобы получить ОКАТО, индекс, ОКТМО и координаты
  const mkdAddress = `${mkd?.formalname_city} ${mkd.formalname_street} ${mkd.house_number}` + (mkd.building ? mkd.building : '') + (mkd.block ? mkd.block : '') + (mkd.letter ? mkd.letter : '')
  console.log('SHIT', mkdAddress)
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

  // дописываем в объект ОКАТО, индекс, ОКТМО и координаты
  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection(`${searchRegions}`)
  await collection.updateOne({'houseguid':houseFiasCode}, { $set: {postalCode, lat, lon, oktmo, okato}}, { upsert: false })

  // ищем в базе обновленный мкд
  const mkdNewSearch = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  const newMkd = mkdNewSearch[0]

  // ищем в базе УК
  const jkhCompanyId = mkd?.management_organization_id
  const jkhBase = regionBase.collection('JKHBase')
  const company = await jkhBase.find({id: jkhCompanyId}).toArray()
  const companyJkh = company[0]

  // делаем запрос в Рорсеестр чтобы получить квартиры МКД
  const kladrObjectCode = getAskDadata.data?.suggestions[0]?.data?.settlement_kladr_id || getAskDadata.data?.suggestions[0]?.data?.city_kladr_id
  const kladrCode = parseInt(kladrObjectCode)
  const findSettlement = regionBase.collection('Reestr_geo')
  const settlement = await findSettlement.find({settlement_code: kladrCode}).toArray()
  const dataOfObject = settlement[0]
  console.log('НАЙДЕННЫЙ ОБЪЕКТ', dataOfObject)
  const macroRegionId = dataOfObject?.macroRegionId
  const regionId = dataOfObject?.regionId
  const street = mkd?.formalname_street
  const houseNumber = mkd?.house_number
  const building = mkd?.building
  const block = mkd?.block
  const letter = mkd?.letter

  const askReestrUrl = `https://rosreestr.gov.ru/fir_lite_rest/api/gkn/address/fir_objects?macroRegionId=${macroRegionId}&regionId=${regionId}&street=${street}&house=${houseNumber}&building=${building}&structure=${block}`
  const flatList = await axios(encodeURI(askReestrUrl))
  console.log('FLATLIST', flatList.data.length)


    return {
      props: {mkd: JSON.stringify(newMkd), jkh: JSON.stringify(companyJkh) || null, flatList: JSON.stringify(flatList.data) || null}
    }
}