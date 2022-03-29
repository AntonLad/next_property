import React from 'react'
import { Link } from 'react-scroll'
// import { useSelector } from 'react-redux'



const InfoMainObject = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const { objectCn } = cadObj?.objectData ?? {}
  const addressNotes = cadObj?.objectData?.objectAddress?.addressNotes || cadObj?.objectData?.objectAddress?.mergedAddress
  const objectName = cadObj?.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { areaValue, utilByDoc } = cadObj?.parcelData ?? {}
  const { name } = cadObj?.price?.flat ?? {}
  const encumbrances = cadObj?.rights?.realty?.encumbrances
  const encumbrancesCheck = encumbrances?.filter((it) =>  it?.encmbState === 1)
  const data = new Date()
  const year = data.getFullYear()
  const month = `0${data.getMonth()+1}`
  const monthReal = month.length > 2 ? month.slice(1) : month
  const day = data.getDate()

  const paramInfo = {
    'Адрес': addressNotes,
    // 'Кадастровый номер:': objectCn,
    'Тип объекта:': objectNameLetter !== '0' && (name || objectName),
    'Тип использования:': utilByDoc,
    'Площадь:': areaValue !== 0 && areaValue && `${areaValue} кв. м.`,
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
    <div>
      {/* <div className="object__content-top">
        <div className="object__content-top-link _print ob">
          <span>Печать</span>
        </div>
        <div className="object__content-top-link _favorite ob">
          <span>В избранное</span>
        </div>
        <div className="object__content-top-link">{`Дата запроса:  ${day}.${monthReal}.${year}`}</div>
        <div className="object__content-top-link ob">
          <span>Обновить</span>
        </div>
      </div> */}
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
          Объект недвижимости № {objectCn}
        </div>
        {encumbrances && encumbrancesCheck.length !== 0 && (
        <div className="attention">
          <Link to="restrictions-info" smooth="true" activeClass="active" spy={true} duration={500}>Внимание! Найдены ограничения или обременения</Link>
        </div>
        )}
        <div className="clearfix"> </div>
        <div className="object__blockTable">
          {outputObject()}
        </div>
      </div>
    </div>
  )
}


export default InfoMainObject
