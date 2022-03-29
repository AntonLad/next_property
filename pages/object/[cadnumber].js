import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { MongoClient } from 'mongodb'
import Meta from '../../Components/meta'
import { useRouter } from 'next/router'
import regions from '../../Components/files/regions'
import dynamic from 'next/dynamic'
import Header from '../../Components/header'
import Footer from '../../Components/footer'
import MenuLeft from '../../Components/menu-left'
import Search from '../../Components/search'
import Scroll from '../../Components/scroll'
import InfoMainObject from '../../Components/info-main-object'
import Cadastr from '../../Components/info-cadastr'
import Mkd from '../../Components/info-mkd'
import Owners from '../../Components/info-owners'
import Price from '../../Components/info-price'
import Restriction from '../../Components/info-restrictions'
import Jkh from '../../Components/info-jkh'
// import testMap from '../../Components/testmap'
// import Map from '../../Components/info-map'
const DynamicMap = dynamic(
  () => import('../../Components/testmap'),
  { ssr: false }
)

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useUnifiedTopology: true })

const urlPassport = process.env.MONGO_URL_PASSPORT
const clientPassport = new MongoClient(urlPassport, { useUnifiedTopology: true })


export default function Object({ cadastralObject, jkh}) {
  const [value, setValue] = useState('')
  const [check, setCheck] = useState(false)
  const router = useRouter()
  const cadNumber = router.query.cadnumber
  const props = JSON.parse(cadastralObject)
  const rights = props?.rights?.realty?.rights
  const rightsCheck = rights?.filter((it) =>  it?.rightState === 1)
  const encumbrances = props?.rights?.realty?.encumbrances
  const encumbrancesCheck = encumbrances?.filter((it) =>  it?.encmbState === 1)
  const stats = value?.price?.stats || value?.stats
  const bldYear = value?.price?.bld?.bldYear || value?.bld?.bldYear
  const bldTitle = value?.price?.bld?.bldTitle || value?.bld?.bldTitle
  const stations = value?.price?.bld?.stations || value?.bld?.stations
  // let checker = value?.price?.address || value?.address

 if (check === '') {
  setCheck(true)
 }

  const addressNotes = props?.objectData?.objectAddress?.addressNotes || props?.objectData?.objectAddress?.mergedAddress

  const adressUrl = `https://mkdfond.ru/api/findflat?address=${addressNotes}&cadNumber=${cadNumber}`
  const encodeUrl = encodeURI(adressUrl)
  let askAboutFlat
  if (addressNotes) {
    const askAboutFlaty = fetch(encodeUrl)
    .then((result) => {
      setCheck(true)
      return result.json()
     }).then((data) => {
      return data
     })
     askAboutFlat = askAboutFlaty
  }

  useEffect(() => {
    setCheck(false)
    setValue('')
  }, [cadNumber])

  useEffect(() => {
    const tryTouchPromise = async () => {
      const result = await askAboutFlat
      setValue(result)
      setCheck(true)
    }
    tryTouchPromise()
  }, [cadNumber])

  return (
    <>
      <Meta
        title={`Проверка объекта недвижимости онлайн. Кадастровый номер: ${cadNumber}, адрес: ${addressNotes}`}
        descritoin={`Проверка объекта недвижимости онлайн по кадастровому номеру ${cadNumber} | Проверка объекта недвижимости онлайн по адресу: ${addressNotes}`}
        keywords={`${cadNumber}, проверка недвижимости, ЕГРН, Росреестр`}
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
                <MenuLeft cadastrObj={cadastralObject} askAboutFlat={askAboutFlat} jkhObj={jkh || null}/>
                <div className="object__contentWrap">
                  <div className="object__content">
                    <InfoMainObject cadastrObj={cadastralObject} />
                    <Cadastr cadastrObj={cadastralObject} />
                    {rights && rightsCheck.length !== 0 && <Owners cadastrObj={cadastralObject} />}
                    {encumbrances && encumbrancesCheck.length !== 0 && <Restriction cadastrObj={cadastralObject} />}
                    {addressNotes && (!check ? (
                      <>
                        <div className="searchTitle">Идет поиск и загрузка данных</div>
                        <div className="spinner1" />
                      </>
                    ) : (
                      <>
                        {(stats?.price || stats?.priceRange || stats?.min) && <Price cadastrObj={askAboutFlat} />}
                        {(bldYear || bldTitle || stations) && check && <Mkd cadastrObj={askAboutFlat} />}
                        {jkh && <Jkh jkhObj={jkh} />}
                        {check && <DynamicMap cadastrObj={askAboutFlat} />}
                        </>
                    ))}
                    <Scroll />
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
  const cadastr = context.params.cadnumber
  await client.connect()
  await clientPassport.connect()
  const db = client.db(process.env.MONGO_COLLECTION)
  const collection = db.collection('searchingObjects')
  const res = await collection.find({ $or : [{'objectData.objectCn': cadastr}, {'objectData.id':cadastr}]}).toArray()
  const cadastrObj = res[0]
  // console.log('CADASTROBJ', cadastrObj )
  const searchAdress = res?.[0]?.objectData?.objectAddress?.addressNotes || res?.[0]?.objectData?.objectAddress?.mergedAddress
  const searchFlat = res?.[0]?.dadata?.flat_type
  if (searchFlat !== null && searchAdress) {
    
    const regionFiasCode = res[0].dadata?.region_fias_id
    const houseFiasCode = res[0].dadata?.house_fias_id
    if (!houseFiasCode) {
      const streetFiasCode = res[0].dadata?.street_fias_id
      const houseNumber = res[0].dadata?.house
      const needRegionsForBase = regions[regionFiasCode]
      const regionBase = clientPassport.db(process.env.MONGO_PASSPORT)
      const regionCollection = regionBase.collection(`${needRegionsForBase}`)
      const findBuildingFromBase = await regionCollection.find({street_id: streetFiasCode, house_number: houseNumber }).toArray()
      const jkhCompanyId = findBuildingFromBase?.[0]?.management_organization_id
      const jkhBase = regionBase.collection('JKHBase')
      const company = await jkhBase.find({id: jkhCompanyId}).toArray()
      const companyJkh = company[0]

      return {
        props: {cadastralObject: JSON.stringify(cadastrObj), jkh: JSON.stringify(companyJkh) || null}, // will be passed to the page component as props
      }
    }
    const needRegionsForBase = regions[regionFiasCode]
    const regionBase = clientPassport.db(process.env.MONGO_PASSPORT)
    const regionCollection = regionBase.collection(`${needRegionsForBase}`)
    const findBuildingFromBase = await regionCollection.find({houseguid: houseFiasCode}).toArray()
    const jkhCompanyId = findBuildingFromBase?.[0]?.management_organization_id
    const jkhBase = regionBase.collection('JKHBase')
    const company = await jkhBase.find({id: jkhCompanyId}).toArray()
    const companyJkh = company[0]

    return {
      props: {cadastralObject: JSON.stringify(cadastrObj), jkh: JSON.stringify(companyJkh) || null}, // will be passed to the page component as props
    }
  }

 return {
    props: {cadastralObject: JSON.stringify(cadastrObj) || null}, // will be passed to the page component as props
  }
}

