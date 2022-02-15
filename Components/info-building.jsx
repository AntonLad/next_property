import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
// import ReactLoading from 'react-loading'
import Header from './header'
import Footer from './footer'
import MenuLeft from './menu-left'
import Search from './search'
import InfoMainObject from './info-main-object'
import Cadastr from './info-cadastr'
// import Mkd from './info-mkd'
import Owners from './info-owners'
// import Price from './info-price'
import Restriction from './info-restrictions'
// import Map from './info-map'

const DynamicMap = dynamic(
  () => import('./info-map'),
  { ssr: false,
    loading: () => 'ЗАГРУЗКА'
  }
)

const DynamicMkd = dynamic(
  () => import('./info-mkd'),
  { ssr: false }
)

const DynamicPrice = dynamic(
  () => import('./info-price'),
  { ssr: false }
)

const InfoAppart = ({ cadastrObj }) => {

  const router = useRouter()
  const cadNumber = router.query.cadnumber

  const rights = cadastrObj?.rights?.realty?.rights[0]
  const encumbrances = cadastrObj?.rights?.realty?.encumbrances
  const stats = cadastrObj?.price?.stats
  const address = cadastrObj?.objectData?.objectAddress?.addressNotes
  const oksType = cadastrObj?.parcelData?.oksType
  const checker = cadastrObj?.price?.address
    
  // const askAboutFlat = async () => {
  //   if (oksType === 'flat') {
  //     const adressUrl = `/api/findflat?address=${address}&cadNumber=${cadNumber}`
  //     const getAskFlat = await axios(adressUrl)
  //     const flatData = getAskFlat.data
  //   }
  // }
  // askAboutFlat()

    // axios.get('https://jsonplaceholder.typicode.com/users/1').then(it => {
    //   setUser(it.data)
    // })





//   useEffect(() => {
//     const localData = JSON.parse(localStorage.getItem(`${info}`))
//     const LocalFlat = localData?.getAskFlat?.data
//     const LocalRights = localData?.getAskRights?.data
//     if (localData) {
//       dispatch(setInputCadastrResult(localData))
//       dispatch(setInputFlat(LocalFlat))
//       dispatch(setInputRights(LocalRights))
//       console.log('LocalFlat', LocalFlat)
//     }
//     const ObjectData = JSON.parse(Cookie.get(info))
//     console.log('NEWDATA', ObjectData)
//   }, [])

  return (
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
              <MenuLeft />
              <div className="object__contentWrap">
                <div className="object__content">
                  <InfoMainObject cadastrObj={cadastrObj} />
                  <Cadastr cadastrObj={cadastrObj} />
                  {rights && rights.rightState === 1 && <Owners cadastrObj={cadastrObj} />}
                  {encumbrances && <Restriction cadastrObj={cadastrObj} />}
                  {stats &&<DynamicPrice cadastrObj={cadastrObj} />}
                  {checker && <DynamicMkd cadastrObj={cadastrObj} />}
                  {checker && <DynamicMap cadastrObj={cadastrObj} />}

                  {/* {oksType === 'flat' && (typeof checker === 'undefined' ? (
                    <>
                      <div className="searchTitle">Загружаем данные о квартире</div>
                      <div className="spinner1" />
                    </>
                  ) : (
                    <>
                      {price && <Price cadastrObj={cadastrObj} />}
                      <Mkd cadastrObj={cadastrObj} />
                      <Map cadastrObj={cadastrObj} />
                    </>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default InfoAppart
