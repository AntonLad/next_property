import React from 'react'

// import { useSelector } from 'react-redux'

// import './info.css'

const Restriction = ({ cadastrObj }) => {
  const encumbrances = cadastrObj?.rights?.realty?.encumbrances

  return (
    <div id="restrictions-info">
      <div className="object__block-wrap">
        <div className="object__block-title _restrictions">
          Обременения и ограничения
        </div>
        {encumbrances?.filter((it) => it.encmbState === 1 )
          .filter((it, index, array) => it.typeName.indexOf(it.typeName) === index )
          .map((it, ind) => {
            return (
              <>
                <div key={ind} className="object__block-title-2 products">
                  {`Обременение: ${it.typeName}`}
                </div>
                <div className="object__blockTable">
                  {it?.regNmbr && (
                    <div className="object__blockTableTr">
                      <div className="object__blockTableTd">Регистрационный номер</div>
                      <div className="object__blockTableTd">{it?.regNmbr}</div>
                    </div>
                  )}
                  {it?.regNmbr && (
                    <div className="object__blockTableTr">
                      <div className="object__blockTableTd">Дата регистрации обременения</div>
                      <div className="object__blockTableTd">{it?.regDate}</div>
                    </div>
                  )}
                  {it?.dateStop && (
                    <div className="object__blockTableTr">
                      <div className="object__blockTableTd">Дата окончания обременения</div>
                      <div className="object__blockTableTd">{it?.dateStop}</div>
                    </div>
                  )}

                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}

export default Restriction
