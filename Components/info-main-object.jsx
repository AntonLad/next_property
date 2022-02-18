import React from 'react'
import { Link } from 'react-scroll'
// import { useSelector } from 'react-redux'



const InfoMainObject = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const { objectCn } = cadObj?.objectData ?? {}
  const addressNotes = cadObj?.objectData?.objectAddress?.addressNotes || cadObj?.objectData?.objectAddress?.mergedAddress
  console.log('ADRESSFROMPROPS', addressNotes)
  const objectName = cadObj?.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { areaValue, utilByDoc } = cadObj?.parcelData ?? {}
  const { name } = cadObj?.price?.flat ?? {}
  const encumbrances = cadObj?.rights?.realty?.encumbrances
  const encumbrancesCheck = encumbrances?.filter((it) =>  it?.encmbState === 1)
  const data = new Date()
  const year = data.getFullYear()
  const month = data.getMonth()
  const day = data.getDate()
  return (
    <div>
      <div className="object__content-top">
        <div className="object__content-top-link _print ob">
          <span>Печать</span>
        </div>
        <div className="object__content-top-link _favorite ob">
          <span>В избранное</span>
        </div>
        <div className="object__content-top-link">{`Дата запроса:  ${day}.${month}.${year}`}</div>
        <div className="object__content-top-link ob">
          <span>Обновить</span>
        </div>
      </div>
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
          Объект недвижимости № {objectCn}
        </div>
        {encumbrances && encumbrancesCheck.length !== 0 && (
        <div className="attention">
          <Link to="restrictions-info" smooth="true" activeClass="active" spy="true" duration={500}>Внимание! Найдены ограничения или обременения</Link>
        </div>
        )}
        <div className="clearfix"> </div>
        <div className="object__blockTable">
          {addressNotes && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Адрес:</div>
            <div className="object__blockTableTd">{addressNotes}</div>
          </div>
          )}
          {objectCn && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Кадастровый номер:</div>
            <div className="object__blockTableTd">{objectCn}</div>
          </div>
          )}
          {objectNameLetter !== '0' && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип объекта:</div>
              <div className="object__blockTableTd">{name || objectName}</div>
            </div>
          )}
          {utilByDoc && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип использования:</div>
              <div className="object__blockTableTd">{utilByDoc}</div>
            </div>
          )}
          {areaValue !== 0 && areaValue && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Площадь:</div>
              <div className="object__blockTableTd">{`${areaValue} кв. м.`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default InfoMainObject
