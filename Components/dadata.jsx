import React, { useState } from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

const Dadata = () => {
  const [value, setValue] = useState()
  // const onChange = (e) => {
  //   setValue(() => e.target.value)
  // }
  console.log('DADATAVALUE', value)
  return (
    <div>
      <AddressSuggestions token="70b8dda637580dd14625d9296f24945f2a6fc4f9" value={value} onChange={setValue} />
    </div>
  )
}

export default Dadata
