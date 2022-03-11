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

  const foo2 = () => {
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
      <div className="object__blockTable">
          {foo(name_full, 'Наименование:')}
          {foo(inn, 'ИНН:')}
          {foo(legal_address, 'Юридический адрес:')}
          {foo2}

          
  
  

        {/* <div className="object__blockTable">
          {name_full && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Наименование:</div>
              <div className="object__blockTableTd">{name_full}</div>
            </div>
          )}
          {inn && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">ИНН:</div>
              <div className="object__blockTableTd">{inn}</div>
            </div>
          )} 
          {legal_address && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Юридический адрес:</div>
              <div className="object__blockTableTd">{legal_address}</div>
            </div>
          )}
          {actual_address && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Фактический адрес:</div>
              <div className="object__blockTableTd">{actual_address}</div>
            </div>
          )}
          {phone && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Телефон:</div>
              <div className="object__blockTableTd">{phone}</div>
            </div>
          )}
          {email && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Электронная почта:</div>
              <div className="object__blockTableTd">{email}</div>
            </div>
          )}
          {site && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Сайт:</div>
              <div className="object__blockTableTd">{site}</div>
            </div>
          )}
          {count_mkd && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Колличество обслуживаемых МКД:</div>
              <div className="object__blockTableTd">{count_mkd}</div>
            </div>
          )}
          {area_total && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Общая территория обслуживания:</div>
              <div className="object__blockTableTd">{area_total} кв.м.</div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}


export default JkhTest2
