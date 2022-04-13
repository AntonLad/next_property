import React from 'react'

const Jkh = ({ jkhObj }) => {
  const jkh = JSON.parse(jkhObj)
  console.log('JKHPROPS', jkh)
  const { name_full, inn, legal_address, actual_address, phone, email, site, count_mkd, area_total  } = jkh ?? {}
  const paramInfo = {
    'Наименование': name_full,
    'ИНН': inn,
    'Юридический адрес:': legal_address,
    'Фактический адрес:': actual_address,
    'Телефон:': phone,
    'Электронная почта:': email,
    'Сайт:': site,
    'Количество обслуживаемых МКД:': count_mkd,
    'Общая территория обслуживания:': `${area_total} кв.м.`
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

  return (
    <div id='jkh'>
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
            Управляющая компания
          </div>
        <div className="object__blockTable">
          {outputObject()}
        </div>
      </div>
    </div>
  )
}

export default Jkh
