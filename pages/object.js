import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import ReactLoading from 'react-loading'

import Header from '../Components/header'
import Footer from '../Components/footer'
import InfoMainObject from '../Components/info-main-object'
import MenuLeft from '../Components/menu-left'
import Search from '../Components/search'
import Cadastr from '../Components/info-cadastr'
import Mkd from '../Components/info-mkd'
import Owners from '../Components/info-owners'
import Price from '../Components/info-price'
import Restriction from '../Components/info-restrictions'
// import Map from '../Components/info-map'

import { setInputCadastrResult, setInputRights } from '../redux/reducers/common'
import { setInputFlat } from '../redux/reducers/flat'

// import './info.css'
// import './main.css'

const InfoAppart = () => {
  const checker = useSelector((store) => store.flat?.getAskPrice?.address)
  const oksType = useSelector((store) => store.common?.getAskReestrByCudNum?.parcelData?.oksType)
  const address = useSelector((store) => store.common?.getAskReestrByCudNum?.objectData?.addressNote)
  const price = useSelector((store) => store.flat?.getAskPrice?.stats?.price)
  const rights = useSelector((store) => store.common.getAskRights?.realty?.rights)
  const { info } = useParams()
  const LocalFlatData = JSON.parse(localStorage.getItem(`${info}`))
  console.log('LOCALDATA', LocalFlatData)
  // const checkFlat = LocalFlatData.getAskFlat?.data
  const dispatch = useDispatch()

  const askAboytFlat = async () => {
    if (oksType === 'flat') {
      const localDatas = JSON.parse(localStorage.getItem(`${info}`))
      const getAskFlat = await axios(`/api/v1/findFlat/${address}`)
      dispatch(setInputFlat(getAskFlat.data))
      localStorage.setItem(`${info}`, JSON.stringify({ ...localDatas, getAskFlat }))
      const localDatass = JSON.parse(localStorage.getItem(`${info}`))
      console.log('FULLLOCALDATA', localDatass)
    }
  }
  askAboytFlat()

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(`${info}`))
    const LocalFlat = localData?.getAskFlat?.data
    const LocalRights = localData?.getAskRights?.data
    if (localData) {
      dispatch(setInputCadastrResult(localData))
      dispatch(setInputFlat(LocalFlat))
      dispatch(setInputRights(LocalRights))
      console.log('LocalFlat', LocalFlat)
    }
  }, [])

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
                  <InfoMainObject />
                  <Cadastr />
                  {rights && <Owners />}
                  <Restriction />
                  {oksType === 'flat' && (typeof checker === 'undefined' ? (
                    <>
                      <div className="searchTitle">Загружаем данные о квартире</div>
                      <div className="spinner1" />
                    </>
                  ) : (
                    <>
                      {price && <Price />}
                      <Mkd />
                      {/* <Map /> */}
                    </>
                  ))}

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