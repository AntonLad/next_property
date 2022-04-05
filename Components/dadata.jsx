import React, { useState } from 'react'
import axios from 'axios'
import { AddressSuggestions } from 'react-dadata';
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'

const Dadata = () => {
  const router = useRouter()
  const [value, setValue] = useState()
  const [serverAnswer, setServerAnswer] = useState('')

  const postalcode = value?.data?.postal_code
  const regionFiasCode = value?.data?.region_fias_id
  const houseFiasCode = value?.data?.house_fias_id || value?.data?.fias_id
  const lat = value?.data?.geo_lat
  const lon = value?.data?.geo_lon
  const oktmo = value?.data?.oktmo
  const okato = value?.data?.okato

  console.log ('DADATAVALUE', value)

  const sendDataToServer = async (postalcode, regionFiasCode, houseFiasCode, lat, lon, oktmo, okato) => {
    const searchObject = await axios.get(`/api/mkdrecdata?postalcode=${postalcode}&regionFiasCode=${regionFiasCode}&houseFiasCode=${houseFiasCode}&lat=${lat}&lon=${lon}&oktmo=${oktmo}&okato=${okato}`)
    setServerAnswer(searchObject)
    console.log('searchObject', searchObject)
    console.log('ЧТО ПРИШЛО С СЕРВЕРА', serverAnswer)
    if (!searchObject.error) {
      router.push(`/mkd/${regionFiasCode}-mkd-${houseFiasCode}`)
    }
  }
  return (
    <>
      <div className="searchInputs">
        <AddressSuggestions token="70b8dda637580dd14625d9296f24945f2a6fc4f9" value={value} onChange={setValue} placeholder="КРЯ"/>
        <button
          className="searchButton"
          type="button"
          autoComplete="off"
          onClick={() => {
            sendDataToServer(postalcode, regionFiasCode, houseFiasCode, lat, lon, oktmo, okato)
          }}
        >
          <div aria-hidden="true" className="searchIcon">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="pledge__form-examples"> Пример:&nbsp;&nbsp;
        <span className="a _blue _inner js__pledgeSearchExample">г Россошь, Пролетарская улица, д 117 кв.34</span>
      </div>
    </>
  )
}

export default Dadata
