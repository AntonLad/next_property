import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MongoClient } from 'mongodb'
import InfoAppart from '../../Components/info-building'
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
// import testMap from '../../Components/testmap'
// import Map from '../../Components/info-map'
const DynamicMap = dynamic(
  () => import('../../Components/testmap'),
  { ssr: false,
    loading: () => 'ЗАГРУЗКА'
  }
)

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url, { useUnifiedTopology: true })


export default function Object({ cadastralObject }) {
  console.log('ALLPROPS', JSON.parse(cadastralObject))
  const [value, setValue] = useState(false)
  
  const router = useRouter()
  const cadNumber = router.query.cadnumber
  const props = JSON.parse(cadastralObject)
  const rights = props?.rights?.realty?.rights
  const rightsCheck = rights?.filter((it) =>  it?.rightState === 1)
  const encumbrances = props?.rights?.realty?.encumbrances
  const encumbrancesCheck = encumbrances?.filter((it) =>  it?.encmbState === 1)
  
  const stats = props?.price?.stats
  const address = props?.objectData?.objectAddress?.addressNotes
  const oksType = props?.parcelData?.oksType
  const checker = props?.price?.address
  const addressNotes = props?.objectData?.objectAddress?.addressNotes || props?.objectData?.objectAddress?.mergedAddress
  // console.log('PROPSADRES', addressNotes)
  // console.log('addressNotes', addressNotes)

  const adressUrl = `/api/findflat?address=${addressNotes}&cadNumber=${cadNumber}`
  let askAboutFlat
  if (addressNotes) {
    const askAboutFlaty = axios(adressUrl)
    .then((result) => {
      localStorage.setItem(`${cadNumber}`, JSON.stringify(result.data))
      return result.data
    })
    askAboutFlat = askAboutFlaty
  }

  // const localDatas = JSON.parse(localStorage.getItem(`${cadNumber}`))
  // console.log('LOCALDAT', localDatas)

  useEffect(() => {
    const tryTouchPromise = async () => {
      const a = await askAboutFlat
      setValue(a)
    }
    tryTouchPromise()
  }, [])
  console.log('VALUE1', value)



  
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
                <MenuLeft cadastrObj={cadastralObject} askAboutFlat={askAboutFlat}/>
                <div className="object__contentWrap">
                  <div className="object__content">
                    <InfoMainObject cadastrObj={cadastralObject} />
                    <Cadastr cadastrObj={cadastralObject} />

                    {rights && rightsCheck.length !== 0 && <Owners cadastrObj={cadastralObject} />}
                    {encumbrances && encumbrancesCheck.length !== 0 && <Restriction cadastrObj={cadastralObject} />}
                    {/* {(stats?.price && stats?.priceRange && stats?.min) && <Price cadastrObj={askAboutFlat} />} */}


                    <Price cadastrObj={askAboutFlat} />
                    <Mkd cadastrObj={askAboutFlat} />

                    {/* карте вернул динамическую загрузку иначе window is not defined */}
                    <DynamicMap cadastrObj={askAboutFlat} />

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
  const db = client.db('cadastr')
  const collection = db.collection('searchingObjects')
  const res = await collection.find({ $or : [{'objectData.objectCn': cadastr}, {'objectData.id':cadastr}]}).toArray()
  const cadastrObj = res[0]
  // const searchAdress = res?.[0].objectData?.objectAddress?.addressNotes || res?.[0].objectData?.objectAddress?.mergedAddress
  // const searchFlat = res?.[0].dadata?.flat_type
  // if (searchFlat !== null && searchAdress) {
  //   const regionFiasCode = res[0].dadata?.region_fias_id
  //   const houseFiasCode = res[0].dadata?.house_fias_id
  //   const needRegionsForBase = regions[regionFiasCode]
  //   const regionBase = client.db('dataHousePassports')
  //   const regionCollection = regionBase.collection(`${needRegionsForBase}`)
  //   const findBuildingFromBase = await regionCollection.find({houseguid: houseFiasCode}).toArray()
  //   // console.log('НАШЕЛ ДОМ В БАЗЕ', findBuildingFromBase[0])
  //   const jkhCompanyId = findBuildingFromBase[0].management_organization_id
  //   console.log('IDJKH', jkhCompanyId)
  //   const jkhBase = regionBase.collection('JKHBase')
  //   const company = await jkhBase.find({id: jkhCompanyId}).toArray()
  //   // console.log('ДАННЫЕ ПО ЖКХ', company[0])
  // }
 return {
    props: {cadastralObject: JSON.stringify(cadastrObj) || null}, // will be passed to the page component as props
  }
}

