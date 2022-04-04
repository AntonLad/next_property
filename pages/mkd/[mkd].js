import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import { useRouter } from 'next/router'
import regions from '../../Components/files/regions'
// import dynamic from 'next/dynamic'
import Header from '../../Components/header'
import Footer from '../../Components/footer'
import Search from '../../Components/search'
// import Scroll from '../Components/scroll'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default function Object({mkd, jkh}) {
  console.log('MKD', mkd)
  console.log('JKH', jkh)
  return (
    <>
      <Meta
        title={`Многоквартирный дом на карте. Индекс`}
        descritoin={`Информация о многоквартином доме, расположенного по адресу. Физический износ, оценочная стоимость, инфраструктура`}
        keywords={`многоквартирный дом, индекс, на карте`}
      />
      <div className="first">
        <Header />
        <div className="header__loader">
          <div className="header__loader-progress"> </div>
        </div>
        <section content-main="">
          <div className="object">
            <div className="content">
              <Search />
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