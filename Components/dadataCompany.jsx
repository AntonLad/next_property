import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { PartySuggestions  } from 'react-dadata';
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import Countdown from './countdown';

const DadataCompany = () => {
  const router = useRouter()
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [serverAnswer, setServerAnswer] = useState('')
  console.log('DADATAANSWER', value)
  const inn = value?.data?.inn
  const ogrn = value?.data?.ogrn
  const okato = value?.data?.okato
  const oktmo = value?.data?.oktmo
  const lat = value?.data?.address.data.geo_lat
  const lon = value?.data?.address.data.geo_lon
  const regionFiasCode = value?.data?.address.data.region_fias_id

  const clearToolTips = () => {
    setServerAnswer('')
  }

  useEffect(() => {
    document.addEventListener('click', clearToolTips)
    return () => document.removeEventListener('click', clearToolTips)
  }, [])

  const sendDataToServer = async (inn, ogrn, okato, oktmo, lat, lon, regionFiasCode) => {
    const searchObject = await axios.get(`/api/jkhDadata?inn=${inn}&ogrn=${ogrn}&okato=${okato}&oktmo=${oktmo}&lat=${lat}&lon=${lon}&regionFiasCode=${regionFiasCode}`)
    .then((result) => {
      if (result.data.error) {
        setLoading(false)
        setServerAnswer(result.data)
      }
      setServerAnswer(result.data)
      setLoading(false)
      return result.data
    })
    console.log('searchObject', searchObject)

    if (!searchObject.error && value.data.inn) {
      router.push(`/jkh/${inn}`)
    }
  }
  return (
    <>
      <div className="searchInputs">
        <PartySuggestions  token="70b8dda637580dd14625d9296f24945f2a6fc4f9" value={value} onChange={setValue} placeholder="тест"/>
        <button
          className="searchButton"
          type="button"
          autoComplete="off"
          onClick={() => {
            sendDataToServer(inn, ogrn, okato, oktmo, lat, lon, regionFiasCode)
            setLoading(true)
          }}
        >
          <div aria-hidden="true" className="searchIcon">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="pledge__form-examples"> Пример:&nbsp;&nbsp;
        <span>КСК "Сергиев Посад"</span>
      </div>
      {serverAnswer?.error && (
        <div className="dataErrorResult1">
          <div className="response">
            {serverAnswer.error}
          </div>
        </div>
      )}
      {loading && (
      <div className="spinnerContainer">
        <div className="spinner">
          <ReactLoading type="spinningBubbles" color="white" height={50} width={50} />
          <span>
            <Countdown />
          </span>
        </div>
      </div>
      )}
    </>
  )
}

export default DadataCompany
