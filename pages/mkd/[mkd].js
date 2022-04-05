import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import { useRouter } from 'next/router'
import regions from '../../Components/files/regions'
// import dynamic from 'next/dynamic'
import Header from '../../Components/header'
import Footer from '../../Components/footer'
import Dadata from '../../Components/dadata'
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
  console.log('MKD', mkdHouse)
  console.log('JKH', jkhInfo)
  return (
    <>
      <Meta
        title={`Проверка многоквартирного дома по адресу: ${addressMkd} на карте | ОКАТО: ${okato}, ОКТМО: ${oktmo}, Индекс: ${postalCode}`}
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
                    привет
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
  const jkhCompanyId = mkdsearch?.[0]?.management_organization_id
  const jkhBase = regionBase.collection('JKHBase')
  const company = await jkhBase.find({id: jkhCompanyId}).toArray()
  const companyJkh = company[0]
    return {
      props: {mkd: JSON.stringify(mkd), jkh: JSON.stringify(companyJkh) || null}
    }
}