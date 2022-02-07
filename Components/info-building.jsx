import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import ReactLoading from 'react-loading'

import Header from './header'
import Footer from './footer'
import InfoMainObject from './info-main-object'
import MenuLeft from './menu-left'
import Search from './search'
import Cadastr from './info-cadastr'
import Mkd from './info-mkd'
import Owners from './info-owners'
import Price from './info-price'
import Restriction from './info-restrictions'
import Map from './info-map'

import { setInputCadastrResult, setInputRights } from '../redux/reducers/common'
import { setInputFlat } from '../redux/reducers/flat'

import './info.css'
import './main.css'

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
                      <Map />
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

//  {/* neaby start */}
//  <div className="object__nearby">
//  <div className="object__nearby-title">Объекты рядом:</div>
//  <div className="object__nearby-wrap">
//    <a href="/reestr/16-52-030505-3152" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:3152</div>
//      <div className="object__nearby-item-descr">
//        Республика Татарстан (Татарстан), г.Набережные Челны, ул.Тан, д.203,
//        кв.205 (19/13 блок В)
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-1300" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:1300</div>
//      <div className="object__nearby-item-descr">
//        г Набережные Челны, ул им Хади Такташа, д. 18, 56
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-409" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:409</div>
//      <div className="object__nearby-item-descr">
//        Республика Татарстан, г Набережные Челны, ул Тан, д 209, кв 27
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-1496" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:1496</div>
//      <div className="object__nearby-item-descr">
//        Республика Татарстан, г Набережные Челны, ул Тан, д 207А, кв 31
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-2449" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:2449</div>
//      <div className="object__nearby-item-descr">
//        Республика Татарстан, г Набережные Челны, ул им Хади Такташа, д 14Б, кв 58
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-555" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:555</div>
//      <div className="object__nearby-item-descr">
//        Республика Татарстан, г Набережные Челны, тракт Сармановский, д 6, кв 109
//      </div>
//    </a>
//    <a href="/reestr/16-52-030505-2429" className="object__nearby-item">
//      <div className="object__nearby-item-title">16:52:030505:2429</div>
//      <div className="object__nearby-item-descr">
//        г Набережные Челны, ул им Хади Такташа, д. 14Б, 108
//      </div>
//    </a>
//  </div>
// </div>
// {/* neaby finish */}
