import React from 'react'
import { Link } from 'react-scroll'
// import { useSelector } from 'react-redux'



const Jkh = ({ jkhObj }) => {
  const jkh = JSON.parse(jkhObj)
  const { name_full, inn, legal_address, actual_address, phone, email, site, count_mkd, area_total  } = jkh ?? {}

  return (
    <div id='jkh'>
  
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
          Управляющая компания
        </div>

        <div className="clearfix"> </div>
        <div className="object__blockTable">
          {name_full && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Наиманование:</div>
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
         
        </div>
      </div>
    </div>
  )
}


export default Jkh