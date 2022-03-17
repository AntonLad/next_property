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
      MONGO
    </button>
  )
}
  

export default ButtonMongo