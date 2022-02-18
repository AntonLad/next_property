import React from 'react'

const Cadastr = ({ cadastrObj }) => {
  const cadObj = JSON.parse(cadastrObj)
  const { firActualDate } = cadastrObj ?? {}
  const { objectCn } = cadObj?.objectData ?? {}
  const addressNotes = cadObj?.objectData?.objectAddress?.addressNotes || cadastrObj?.objectData?.objectAddress?.mergedAddress
  const objectName = cadObj?.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { name, floor } = cadObj?.flat?.price?.flat ?? {}
  const rightType = cadObj?.rights?.realty?.rights
  const {
    dateCreate, cadCost, dateCost, oksElementsConstructStr, oksFloors, oksUFloors, oksYearBuilt
  } = cadObj?.parcelData ?? {}

  // const { regDate, infoUpdateDate } = useSelector((store) => store.common.getAskReestrByCudNum)

  const { areaValue } = cadastrObj?.parcelData ?? {}

  // console.log('+OBJ', objectName[0], 'TYPE', typeof objectName, '1 буква')
  return (
    <div data-content="kadastr" id="kadastr-info" className="object__block">
      <div className="object__block-wrap">
        <div className="object__block-title _kadastr">Кадастровые сведения:</div>
        <div className="clearfix"> </div>
        <div className="object__blockTable">
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Кадастровый номер:</div>
            <div className="object__blockTableTd">
              <b>{objectCn}</b>
            </div>
          </div>
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Адрес по документам:</div>
            <div className="object__blockTableTd">{addressNotes}</div>
          </div>
          {objectNameLetter !== '0' && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Тип:</div>
            <div className="object__blockTableTd">{name || objectName}</div>
          </div>
          )}
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Тип собственности:</div>
            <div className="object__blockTableTd">
              <span>{rightType?.reduce((acc, rec) => rec.typeName, ' ') || 'не известно'}</span>
            </div>
          </div>
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Площадь:</div>
            <div className="object__blockTableTd">{areaValue} кв.м.</div>
          </div>
          {floor && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Этаж:</div>
            <div className="object__blockTableTd">{`${floor} этаж`}</div>
          </div>
          )}
          {oksElementsConstructStr && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Матариалы стен:</div>
            <div className="object__blockTableTd">{`${oksElementsConstructStr}`}</div>
          </div>
          )}
          {oksFloors && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Этажность:</div>
            <div className="object__blockTableTd">{oksFloors}</div>
          </div>
          )}
          {oksUFloors && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Количество подземных этажей:</div>
            <div className="object__blockTableTd">{oksUFloors}</div>
          </div>
          )}
          {oksYearBuilt && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Год постройки:</div>
            <div className="object__blockTableTd">{oksYearBuilt}</div>
          </div>
          )}
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Дата постановки на учёт:</div>
            <div className="object__blockTableTd">{dateCreate}</div>
          </div>
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Дата обновления информации:</div>
            <div className="object__blockTableTd">{firActualDate}</div>
          </div>
        </div>
        <div className="object__block-title-2">Кадастровая стоимость:</div>
        <div className="clearfix"> </div>
        <div className="object__blockTable">
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Кадастровая стоимость:</div>
            <div className="object__blockTableTd">
              <b>{cadCost} руб.</b>&nbsp;
            </div>
          </div>
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Дата утверждения стоимости:</div>
            <div className="object__blockTableTd">{dateCost}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastr
