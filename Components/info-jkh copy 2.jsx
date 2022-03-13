import { InfoTwoTone } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-scroll'
// import { useSelector } from 'react-redux'



const JkhTest2 = ({ jkhObj }) => {
  const jkh = JSON.parse(jkhObj)
  const { name_full, inn, legal_address, actual_address, phone, email, site, count_mkd, area_total  } = jkh ?? {}
  const paramInfo = {
    'Наименование': name_full,
    'ИНН': inn,
    'Юридический адрес': legal_address,
    'Фактический адрес:': actual_address,
    'Телефон:': phone,
    'Электронная почта:': email,
    'Сайт:': site,
    'Количество обслуживаемых МКД:': count_mkd,
    'Общая территория обслуживания:': area_total
  }
  const foo = (param, name) => {
    return param && (
      <div className="object__blockTableTr">
        <div className="object__blockTableTd">{name}</div>
        <div className="object__blockTableTd">{param}</div>
      </div>
    )
  }

  const foo3 = () => {
    Object.keys(paramInfo).map((it) => {
      return foo(paramInfo[it], it)
    })
  }

  const foo2 = (paramInfo) => {
    Object.keys(paramInfo).map((it, ind) => {
      return (
        <div key={ind}>
          {paramInfo[it] && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">{it}:</div>
              <div className="object__blockTableTd">{paramInfo[it]}</div>
            </div>
          )}
        </div>
      )
    })
    } 
  


  return (
    <div id='jkh'>
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
            Управляющая компания
          </div>
        <div className="object__blockTable">
          {foo3()}
          {/* foo3 не работает  */}
          {/* {Object.keys(paramInfo).map((it, ind) => {
            return (
              <div key={ind}>
                {foo(paramInfo[it], it)}
              </div>
            )
          })} */}
            {foo(name_full, 'Наименование:')}
            {foo(inn, 'ИНН:')}
            {foo(legal_address, 'Юридический адрес:')}
            
        </div>
      </div>  
    </div>
  )
}


export default JkhTest2
