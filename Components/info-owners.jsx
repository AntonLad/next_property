import React, { useState } from 'react'

const Owners = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const rights = cadObj.rights?.realty?.rights

  const outputObject = (item) => {
    const paramInfo =  {
      'Дата регистрации собственности:': item.regDate,
      'Тип собственности': item.typeName,
      'Доля собственности': item.partText,
      'Регистрационный номер': item.regNmbr,
    }
    const arr = [1, 2, 3, 4, 5, 6, 7]
    return Object.keys(paramInfo).map((it, ind) => {
      return paramInfo[it] && (
        <div key={it} className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfo[it]}</div>
        </div>
      )
    })
  }

  return (
    <div data-content="main" className="object__block" id="owners-info">
      <div className="object__block-wrap">
        <div className="object__block-title _owner">
          Информация о собственности
        </div>
        {rights?.filter((it) => it?.rightState === 1)
          .map((it, ind) => {
            return (
              <div key={it.externalId}>
                <div className="object__block-title-2 products">
                  {`Собственник ${ind + 1}`}
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

export default Owners
