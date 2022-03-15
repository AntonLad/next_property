import React from 'react'

const Cadastr = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const { firActualDate } = cadObj ?? {}
  const { objectCn } = cadObj?.objectData ?? {}
  const addressNotes = cadObj?.objectData?.objectAddress?.addressNotes || cadObj?.objectData?.objectAddress?.mergedAddress
  const objectName = cadObj?.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { name, floor } = cadObj?.flat?.price?.flat ?? {}
  const rightType = cadObj?.rights?.realty?.rights
  const {
    dateCreate, cadCost, dateCost, oksElementsConstructStr, oksFloors, oksUFloors, oksYearBuilt, areaValue
  } = cadObj?.parcelData ?? {}
    
  const paramInfo = {
    'Кадастровый номер:': <b>{objectCn}</b>,
    'Адрес по документам:': addressNotes !== '0' && addressNotes,
    'Тип:':  objectNameLetter !== '0' && (name || objectName),
    'Тип собственности:':  rightType?.reduce((acc, rec) => rec.typeName, ' ') || 'не известно',
    'Площадь:': areaValue !== 0 && areaValue && `${areaValue} кв. м.`, 
    'Этаж:': floor,
    'Материалы стен:': oksElementsConstructStr,
    'Этажность:': oksFloors,
    'Количество подземных этажей:': oksUFloors,
    'Год постройки:': oksYearBuilt,
    'Дата постановки на учёт:': dateCreate,
    'Дата обновления информации:': firActualDate,  
  }

  const outputObject = () => {
    return Object.keys(paramInfo).map((it) => {
      return paramInfo[it] && (
        <div className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfo[it]}</div>
        </div>
      )
    })
  }

  const paramInfo2 = {
    'Кадастровая стоимость:': <b>{cadCost} руб.</b>,
    'Дата утверждения стоимости:': dateCost,  
  }

  const outputObject2 = () => {
    return Object.keys(paramInfo2).map((it) => {
      return paramInfo2[it] && (
        <div className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfo2[it]}</div>
        </div>
      )
    })
  }  

  return (
    <div data-content="kadastr" id="kadastr-info" className="object__block">
      <div className="object__block-wrap">
        <div className="object__block-title _kadastr">Кадастровые сведения:</div>
        <div className="object__blockTable">
          {outputObject()}  
        </div>
        {cadCost !== 0 && cadCost && (
          <>
            <div className="object__block-title-2">Кадастровая стоимость:</div>
            <div className="clearfix"> </div>
            <div className="object__blockTable">
              {outputObject2()} 
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cadastr
