import React from 'react'

const Price = ({ cadastrObj }) => {
  const { price } = cadastrObj.price?.stats ?? {}
  const priceRange = cadastrObj?.price?.stats?.priceRange
  const meterPrice = cadastrObj?.price?.stats

  return (
    <div>
      <div data-content="main" className="object__block" id="price-info">
        <div className="object__block-title _price">
          Рыночная стоимость обекта недвижимости
        </div>
        <div className="clearfix"> </div>
        {price && (
          <>
            <div className="object__block-title-2">Оценочная стоимость квартиры:</div>
            <div className="object__blockTable">
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Общая стоимость:</div>
                <div className="object__blockTableTd">{`${price} руб.`}</div>
              </div>
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Стоимость квадратного метра:</div>
                <div className="object__blockTableTd">{`${meterPrice.median} руб.`}</div>
              </div>
            </div>
          </>
        )}
        <div className="object__block-title-2">Стоимость квадратного метра:</div>
        <div className="blockInfo">
          {meterPrice && (
            <>
              <div className="minimalPrice">{`Минимум ${meterPrice.min} руб`}</div>
              <div className="middlePrice">{`В среднем ${meterPrice.average} руб`}</div>
              <div className="maximumPrice">{`Максимум ${meterPrice.max} руб`}</div>
            </>
          )}
        </div>
        {priceRange && (
          <>
            <div className="object__block-title-2">Ценовой диапазон:</div>
            <div className="object__blockTable">
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Минимальная цена:</div>
                <div className="object__blockTableTd">{`${priceRange[0]} руб.`}</div>
              </div>
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Максимальная цена:</div>
                <div className="object__blockTableTd">{`${priceRange[1]} руб.`}</div>
              </div>
            </div> 
          </>
        )}
          {/* {objectId && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Кадастровый номер:</div>
            <div className="object__blockTableTd">{objectId}</div>
          </div>
          )}
          {(objectName || name) && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип объекта:</div>
              <div className="object__blockTableTd">{objectName || name}</div>
            </div>)}
          {areaValue && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Площадь:</div>
            <div className="object__blockTableTd">{areaValue}</div>
          </div>
          )} */}
          {/* <div data-content="owners" id="price-info" className="object__block">
    <div className="object__block-load">
      <div className="loader__table">
        <div className="loader__td">
          <div className="loader__img"> </div>
        </div>
      </div>
    </div>
    <div className="object__block-wrap">
      <div className="object__block-title _price">Рыночная стоимость объекта недвижимости</div>
      <div className="object__block-date">от (дата)</div>
      <div className="clearfix"> </div>
      <div className="object__block-data">
        <div className="object__block-data-count">Стоимость объекта</div>
        <div className="object__block-data-wrap">
          <div className="object__block-data-item">
            <div className="object__block-data-item-title">
              стоимость кв метра
            </div>
            <div className="object__block-data-item-lock">
              <div className="object__block-data-item-lock-block">Данные в отчёте</div>
            </div>
            <div className="object__block-data-item-text">
              {' '}
              Дата регистрации:
              <b>25.07.2007</b>Свидетельство о регистрации:
              <b>№**-**-30/052/*00*-359</b>
              Форма владения:
              <b>Собственность</b>
              Во владении:
              <b className="_success"> 14 лет 5 месяцев 29 дней </b>
              Основание:
              <b>************* ******* *************</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
      </div>
    </div>

    

  )
}

export default Price
