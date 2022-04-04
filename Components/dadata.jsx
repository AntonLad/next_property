import React, { useState } from 'react'
import { AddressSuggestions } from 'react-dadata';
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
// import 'react-dadata/dist/react-dadata.css';

const Dadata = () => {
  const [value, setValue] = useState()
  console.log ('DADATAVALUE', value)
  return (
    <div className="searchInputs">
      <AddressSuggestions token="70b8dda637580dd14625d9296f24945f2a6fc4f9" value={value} onChange={setValue} placeholder="КРЯ"/>
      <button
        className="searchButton"
        type="button"
        autoComplete="off"
        onClick={() => {

        }}
      >
        <div aria-hidden="true" className="searchIcon">
          <SearchIcon />
        </div>
      </button>
    </div>
  )
}

export default Dadata
