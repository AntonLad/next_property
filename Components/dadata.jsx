import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { AddressSuggestions } from 'react-dadata';
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import Countdown from './countdown';

const Dadata = () => {
  const router = useRouter()
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [serverAnswer, setServerAnswer] = useState('')
  console.log ('ОТВЕТ ОТ СЕРВЕРА', serverAnswer)
  const postalcode = value?.data?.postal_code
  const regionFiasCode = value?.data?.region_fias_id
  const houseFiasCode = value?.data?.house_fias_id || value?.data?.fias_id
  const lat = value?.data?.geo_lat
  const lon = value?.data?.geo_lon
  const oktmo = value?.data?.oktmo
  const okato = value?.data?.okato

  const clearToolTips = () => {
    setServerAnswer('')
  }

  useEffect(() => {
    document.addEventListener('click', clearToolTips)
    return () => document.removeEventListener('click', clearToolTips)
  }, [])


  const sendDataToServer = async (postalcode, regionFiasCode, houseFiasCode, lat, lon, oktmo, okato) => {
    const searchObject = await axios.get(`/api/mkdrecdata?postalcode=${postalcode}&regionFiasCode=${regionFiasCode}&houseFiasCode=${houseFiasCode}&lat=${lat}&lon=${lon}&oktmo=${oktmo}&okato=${okato}`)
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
    if (!searchObject.error) {
      router.push(`/mkd/${regionFiasCode}-mkd-${houseFiasCode}`)
    }
  }
  return (
    <>
      <div className="searchInputs">
        <AddressSuggestions token="70b8dda637580dd14625d9296f24945f2a6fc4f9" value={value} onChange={setValue} placeholder="тест"/>
        <button
          className="searchButton"
          type="button"
          autoComplete="off"
          onClick={() => {
            sendDataToServer(postalcode, regionFiasCode, houseFiasCode, lat, lon, oktmo, okato)
            setLoading(true)
          }}
        >
          <div aria-hidden="true" className="searchIcon">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="pledge__form-examples"> Пример:&nbsp;&nbsp;
        <span
          className="a _blue _inner js__pledgeSearchExample"
          >г. Самара, ул Дыбенко, 30
        </span>
      </div>
      {serverAnswer?.error && (
        <div className="dataErrorResult">
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

export default Dadata
