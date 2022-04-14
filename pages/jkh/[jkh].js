import React from 'react'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import SeoMenu from '../../Components/seoMenu'
import Breadcrumbs from '../../Components/breadcrumbs'
import Header from '../../Components/header'
import Jkh from '../../Components/info-jkh'
import RandomMkdObjects from '../../Components/randomMkdObjects'
import Footer from '../../Components/footer'
import DadataCompany from '../../Components/dadataCompany'
import regions from '../../Components/files/regions'
import dynamic from 'next/dynamic'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const DynamicMkdMap = dynamic(
  () => import('../../Components/mkdMap'),
  { ssr: true }
)
// import Scroll from '../Components/scroll'

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

export default function Object({jkh, mkdList}) {
  const jkhCompamy = JSON.parse(jkh)
  const nameJkh = jkhCompamy?.name_short
  const addressJkh = jkhCompamy?.legal_address
  const inn = jkhCompamy?.inn
  const okato = jkhCompamy?.okato
  const oktmo = jkhCompamy?.oktmo

  return (
    <>
      <Meta
        title={`Управляющая компания ЖКХ - ${nameJkh} на карте. Адрес: ${addressJkh}, ОКАТО: ${okato}, ИНН: ${inn}`}
        descritoin={`Информация об управляющей компании ЖКХ - ${nameJkh}, расположенной по адресу: ${addressJkh}. ОКТМО: ${oktmo}`}
        keywords={`${jkhCompamy}, ИНН, ОКАТО, ОКТМО`}
      />
      <div className="first">
        <Header />
        <div className="header__loader">
          <div className="header__loader-progress"> </div>
        </div>
        <section content-main="">
          <div className="object">
            <div className="content">
              <Breadcrumbs cadastrObj={jkh}/>
              <DadataCompany />
              <div className="object__wrap">
                <SeoMenu />
                {/* <MenuLeft cadastrObj={cadastralObject} askAboutFlat={askAboutFlat} jkhObj={jkh || null}/> */}
                <div className="object__contentWrap">
                  <div className="object__content">
                    <Jkh jkhObj={jkh} />
                    <DynamicMkdMap mkd={jkh}/>
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
  // получаем ИНН из URL
  const inn = context.params.jkh
  console.log('INN', inn)

  // подключаемся к базе и ищем УК ЖКХ
  await client.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection('JKHBase')
  const jkhSearch = await collection.find({inn: inn}).toArray()
  const jkhCompamy = jkhSearch[0]

  // если ЖКХ не найден, возвращаем 404 ошибку
  if (!jkhCompamy) {
    return {
      notFound: true
    }
  }

  // ищем дома, которыми управляет ЖКХ
  const jkhId = jkhCompamy.id
  const regionFiasCode = jkhCompamy.regionFiasCode
  const searchRegions = regions[regionFiasCode]
  const regionCollection = db.collection(`${searchRegions}`)
  const mkdList = await regionCollection.find({management_organization_id: jkhId}).toArray()
  console.log('MKDLIST', mkdList.length)
  if (mkdList.length > 10) {
    const slicedMkdList = mkdList.slice(0,10)
    return {
      props: {jkh: JSON.stringify(jkhCompamy) || null, mkdList: JSON.stringify(slicedMkdList)}
    }
  }

    return {
      props: {jkh: JSON.stringify(jkhCompamy) || null, mkdList: JSON.stringify(mkdList)}
    }
}