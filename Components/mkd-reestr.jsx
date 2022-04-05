import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'

const MkdReestr = ({ mkdObj, jkhObj }) => {

  const mkdInfo = JSON.parse(mkdObj)
  const jkhInfo = JSON.parse(jkhObj)

  console.log('mkdObj', mkdInfo )
  console.log('jkhObj', jkhInfo )


   const { address, area_common_property, area_land, built_year, cold_water_type, drainage_type, electrical_entries_count, 
    electrical_type, elevators_count, energy_efficiency, entrance_count, exploitation_start_year} = mkdInfo
  
 
  // const date = new Date().getFullYear()
  // const buildingDamage = date - bldYear
  // const [model, setModel] = useState(false)
  // const [tempImg, setTempImg] = useState('')
  // const getImg = (img) => {
  //   setTempImg(img)
  //   setModel(true)
  // }

  // const buildingState = (value) => {
  //   if ( value <= 20 ) { return <span className="greenState">Хорошее</span> }
  //   if ( value <= 40 ) { return <span className="yellowState">Удовлетворительное</span> }
  //   if ( value <= 60 ) { return <span className="orangeState">Неудовлетворительное</span> }
  //   return <span className="redState">Критическое</span>
  // }

  // const flor = (fl) => {
  //   if (fl >= 5 && fl <=20) {return 'этажей'}
  //   const regexp = /1$/g
  //   const checker = regexp.test(fl) 
  //   if (checker) {return 'этаж'}
  //   const regexp2 = /2$|3$|4$/g
  //   const checker2 = regexp2.test(fl)
  //   if (checker2) {return 'этажа'}
  //   return 'этажей' 
  // }

  const paramInfo = {
    'Адрес:': address,
    'Год постройки:': built_year,
    'Общая площадь собственности': area_common_property,
    'Площадь земельного участвка': area_land,
    'Холодное водоснобжение': cold_water_type,
    'Тип дренажной системы:': drainage_type,
    'Кол-во электрических входов??? ': electrical_entries_count,
    'Подключение электричества??? ': electrical_type,
    'Количество лифтов:': elevators_count,
    'Класс энергосбережения:': energy_efficiency,
    'Количество подъездов:': entrance_count,
    'Год начала эксплуатации здания:': exploitation_start_year,

   
  }

  const outputObject = () => {
    return Object.keys(paramInfo).map((it) => {
      return paramInfo[it] && (
        <div key={it} className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfo[it]}</div>
        </div>
      )
    })
  }

  // const uniqueKey = () => (+new Date() + Math.random())
  // const uniqueKey2 = () => (+new Date() +  Math.random())
  return (
    <div>
      <div data-content="mkd" id="mkd-info" className="object__block">
          <div className="object__block-wrap">        
            <div className="object__block-title _mkd">Информация о МКД</div>
            <div className="object__blockTable _first">
              {outputObject()}
            </div>
          </div>
        </div>
    </div>
  )
}

export default MkdReestr



