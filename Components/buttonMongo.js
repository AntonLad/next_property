import React from 'react'
import axios from 'axios'




const ButtonMongo =  () => {
  const addObj = async () => {
    await axios.get(`/api/mongoObj`)
    .then((result) => {
      return result.data
    })
  }
  return (
    <button
      className="button"
      type="button"
      onClick={() => {
        addObj()
      }}
    >
      Делаем файл с фиасами
    </button>
  )
}
  

export default ButtonMongo