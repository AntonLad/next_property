import React, { useState } from 'react'

const Restriction = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const encumbrances = cadObj?.rights?.realty?.encumbrances

  const outputObject = (item) => {
    const paramInfo =  {
      'Регистрационный номер:': item.regNmbr,
      'Дата регистрации обременения': item.regDate,
      'Дата окончания обременения': item.dateStop,
      
    }
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
    <div id="restrictions-info">
      <div className="object__block-wrap">
        <div className="object__block-title _restrictions">
          Обременения и ограничения
        </div>
        {encumbrances?.filter((it) => it.encmbState === 1 )
          .filter((item, i, arr) => arr.findIndex((it) => it.typeName === item.typeName && it.regNmbr === item.regNmbr) === i)
          .map((it, ind) => {
            return (
              <div key={it.externalId}>
                <div className="object__block-title-2 products">
                  {`Обременение: ${it.typeName}`}
                </div>
                <div className="object__blockTable">
                  {outputObject(it)}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Restriction
