import React, { useState } from 'react'

const Owners = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const rights = cadObj.rights?.realty?.rights
  
  return (
 
    <div data-content="main" className="object__block" id="owners-info">
      <div className="object__block-wrap">
        <div className="object__block-title _owner">
          Информация о собственности
        </div>
        {rights?.filter((it) => it?.rightState === 1)
          .map((it, ind) => {
            return (
              <>
                <div key={ind} className="object__block-title-2 products">
                  {`Собственник ${ind + 1}`}
                </div>
                <div className="object__blockTable">
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Дата регистрации собственности</div>
                    <div className="object__blockTableTd">{it?.regDate}</div>
                  </div>
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Тип собственности</div>
                    <div className="object__blockTableTd">{it?.typeName}</div>
                  </div>
                  {it?.partText && (
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Доля собственности</div>
                    <div className="object__blockTableTd">{it?.partText}</div>
                  </div>
                  )}
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Регистрационный номер</div>
                    <div className="object__blockTableTd">{it?.regNmbr}</div>
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}

export default Owners
