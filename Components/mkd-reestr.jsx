import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'

const MkdReestr = ({ mkdObj, jkhObj }) => {

  const mkdInfo = JSON.parse(mkdObj)
  const jkhInfo = JSON.parse(jkhObj)

  console.log('mkdObj', mkdInfo )
  console.log('jkhObj', jkhInfo )

  const { address, area_common_property, area_land, built_year, cold_water_type, drainage_type, 
    electrical_type, elevators_count, energy_efficiency, entrance_count, exploitation_start_year, project_type, house_type, 
    is_alarm, method_of_forming_overhaul_fund, floor_count_max, floor_count_min, area_non_residential, parking_square,
    playground, sportsground, other_beautification, foundation_type, floor_type, wall_material, chute_type, chute_count,
    heating_type, hot_water_type, quarters_count, living_quarters_count, unliving_quarters_count, area_total, area_residential,
    sewerage_type, gas_type, ventilation_type, firefighting_type } = mkdInfo
  
  const { actual_address, count_mkd, email, inn, name_full, phone, site } = jkhInfo
  const areaTotalJkh = jkhInfo.area_total
  
  const paramInfo = {
    'Адрес многоквартирного дома:': address,
    'Год постройки:': built_year,
    'Год ввода в эксплуатацию:': exploitation_start_year,
    'Серия или тип строения:': project_type,
    'Тип дома:': house_type,
    'Факт внесения здания в реестр аварийных домов:': is_alarm,
    'Способ формирования фонда капитального ремонта:': method_of_forming_overhaul_fund,
    'Максимальное количество этажей:': floor_count_max,
    'Минимальное количество этажей:': floor_count_min,
    'Количество подъездов:': entrance_count,
    'Количество лифтов:': elevators_count,
    'Класс энергоэффективности:': energy_efficiency,
    'Общее количество помещений:': quarters_count,
    'Количество квартир:': living_quarters_count,
    'Количество нежилых помещений, ед.:': unliving_quarters_count,
    'Площадь дома:': area_total,
    'Общая площадь квартир:': area_residential,
    'Общая площадь нежилых помещений:': area_non_residential,
    'Площадь парковки:': parking_square,
    'Детская площадка:': playground,
    'Спортивная площадка:': sportsground,
    'Элементы благоустройства:': other_beautification,
    'Тип фундамента:': foundation_type,
    'Тип перекрытий:': floor_type,
    'Материал несущих стен:': wall_material,
    'Наличие мусоропровода:': chute_type,
    'Количество мусоропроводов, ед.:': chute_count,
    'Электроснабжение': electrical_type,
    'Теплоснабжение': heating_type,
    'Горячее водоснабжение': hot_water_type,
    'Холодное водоснобжение': cold_water_type,
    'Водоотведение': sewerage_type,
    'Газоснабжение': gas_type,
    'Вентиляция': ventilation_type,
    'Системы пожаротушения': firefighting_type,

    '???Общая площадь собственности???': area_common_property,
    '???Площадь земельного участвка': area_land,
    '???Тип дренажной системы:': drainage_type, 
  }
  const paramInfoJkh = {
    'Наименование:': name_full,
    'Адрес управляющей компании (ЖКХ, ТСЖ):': actual_address,
    'ИНН организации:': inn,
    'Количество домов под управлением:': count_mkd,
    'Общая площадь объектов под управлением:': areaTotalJkh,
    'Адрес электронной почты:': email,
    'Телефон:': phone,
    'Сайт:': site,
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
  
  const outputObjectJkh = () => {
    return Object.keys(paramInfoJkh).map((it) => {
      return paramInfoJkh[it] && (
        <div key={it} className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfoJkh[it]}</div>
        </div>
      )
    })
  }

 
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
      <div data-content="mkd" id="mkd-info" className="object__block">
        <div className="object__block-wrap">        
          <div className="object__block-title _mkd">Информация об управляющей компании</div>
          <div className="object__blockTable _first">
            {outputObjectJkh()}
          </div>
        </div>
      </div>

    </div>
  )
}

export default MkdReestr

 // const uniqueKey = () => (+new Date() + Math.random())
  // const uniqueKey2 = () => (+new Date() +  Math.random())

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
