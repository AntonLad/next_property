import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'

const MkdReestr = ({ mkdObj, jkhObj }) => {
  const data = new Date()
  const year = data.getFullYear()
  const month = `0${data.getMonth()+1}`
  const monthReal = month.length > 2 ? month.slice(1) : month
  const day = data.getDate()

  const mkdInfo = JSON.parse(mkdObj)
  const jkhInfo = JSON.parse(jkhObj)

  const { address, built_year, cold_water_type, drainage_type,
    electrical_type, elevators_count, energy_efficiency, entrance_count, exploitation_start_year, project_type, house_type,
    is_alarm, method_of_forming_overhaul_fund, floor_count_max, floor_count_min, area_non_residential, parking_square,
    playground, sportsground, other_beautification, foundation_type, floor_type, wall_material, chute_type, chute_count,
    heating_type, hot_water_type, quarters_count, living_quarters_count, unliving_quarters_count, area_total, area_residential,
    sewerage_type, gas_type, ventilation_type, firefighting_type } = mkdInfo
  
  const name = () => {
    if(jkhInfo) {
      let nameJkh = jkhInfo?.name_full
      const nameArr = nameJkh.split('')
      console.log('NAME', nameJkh )
      nameArr[0] === '#' ? nameJkh = jkhInfo?.name_short : nameJkh = jkhInfo?.name_full  // убираем варинты не коректного полного имени типа ###############
      return nameJkh
    }
  }
     
  const paramInfo = {
    'Адрес многоквартирного дома:': address,
    'Код ОКАТО:': mkdInfo?.okato,
    'Код ОКТМО:': mkdInfo?.oktmo,
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
    'Количество нежилых помещений:': unliving_quarters_count,
    'Площадь дома:': area_total && `${area_total} кв.м.`,
    'Общая площадь квартир:': area_residential && `${area_residential} кв.м.`,
    'Общая площадь нежилых помещений:': area_non_residential && `${area_non_residential} кв.м.`,
    'Площадь парковки:': parking_square && `${parking_square} кв.м.`,
    'Детская площадка:': playground && `${playground} кв.м.`,
    'Спортивная площадка:': sportsground && `${sportsground} кв.м.`,
    'Элементы благоустройства:': other_beautification,
    'Тип фундамента:': foundation_type,
    'Тип перекрытий:': floor_type,
    'Материал несущих стен:': wall_material,
    'Наличие мусоропровода:': chute_type,
    'Количество мусоропроводов:': chute_count,
    'Электроснабжение': electrical_type,
    'Теплоснабжение': heating_type,
    'Горячее водоснабжение': hot_water_type,
    'Холодное водоснобжение': cold_water_type,
    'Водоотведение': sewerage_type,
    'Газоснабжение': gas_type,
    'Вентиляция': ventilation_type,
    'Системы пожаротушения': firefighting_type,
    'Тип дренажной системы:': drainage_type,
  }
  const paramInfoJkh = {
    'Наименование:': name(),
    'Адрес управляющей компании (ЖКХ, ТСЖ):': jkhInfo?.actual_address,
    'ИНН организации:': jkhInfo?.inn,
    'Количество домов под управлением:': jkhInfo?.count_mkd,
    'Общая площадь объектов под управлением:': jkhInfo?.area_total && `${jkhInfo?.area_total} кв.м.`,
    'Адрес электронной почты:': jkhInfo?.email,
    'Телефон:': jkhInfo?.phone,
    'Сайт:': jkhInfo?.site,
  }

  const outputObject = () => {
    return Object.keys(paramInfo).map((it) => {
      return paramInfo[it] && paramInfo[it] !== "Не заполнено" && (
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
        <div className="object__content-top">
          <div className="object__content-top-link ">{`Дата запроса:  ${day}.${monthReal}.${year}`}</div>
        </div>
        <div className="object__block-wrap">
          <div className="object__block-title _mkd">Информация о МКД</div>
          <div className="object__blockTable _first">
            {outputObject()}
          </div>
        </div>
      </div>
      {jkhInfo && (
        <div data-content="mkd" id="mkd-info" className="object__block">
          <div className="object__block-wrap">
            <div className="object__block-title _mkd">Информация об управляющей компании</div>
            <div className="object__blockTable _first">
              {outputObjectJkh()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MkdReestr
