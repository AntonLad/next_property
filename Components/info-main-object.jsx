import React from 'react'
import { Link } from 'react-scroll'
// import { useSelector } from 'react-redux'



const InfoMainObject = ({ cadastrObj }) => {
  const { objectCn } = cadastrObj?.objectData ?? {}
  const addressNotes = cadastrObj?.objectData?.objectAddress?.addressNotes
  const objectName = cadastrObj?.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { areaValue, utilByDoc } = cadastrObj?.parcelData ?? {}
  const { name } = cadastrObj?.price?.flat ?? {}
  const encumbrances = cadastrObj?.rights?.realty?.encumbrances

  return (
    <div>
      <div className="object__content-top">
        <div className="object__content-top-link _print ob">
          <span>Печать</span>
        </div>
        <div className="object__content-top-link _favorite ob">
          <span>В избранное</span>
        </div>
        <div className="object__content-top-link">Дата запроса:&nbsp;&nbsp;27.01.2022</div>
        <div className="object__content-top-link ob">
          <span>Обновить</span>
        </div>
      </div>
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
          Объект недвижимости № {objectCn}
        </div>
        {encumbrances && (
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
