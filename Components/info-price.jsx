import React, { useState } from 'react'

const Price = ({ cadastrObj }) => {
  const [value, setValue] = useState(false)
  const price = value?.price?.stats?.price || value?.stats?.price
  const priceRange = value?.price?.stats?.priceRange || value?.stats?.priceRange
  const meterPrice = value?.price?.stats || value?.stats
  console.log('METERPRICE', meterPrice )
  

  const tryTouchPromise = async () => {
    const a = await cadastrObj
    setValue(a)
  }
  tryTouchPromise()

  return (
    <>
      {!value ? (
        <>
          {''}
          {/* <div className="searchTitle">Загружаем данные о стоимости</div>
          <div className="spinner1" /> */}
        </>
      ) : (
        <div data-content="main" className="object__block" id="price-info">
          <div className="object__block-wrap">
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
                    <div className="object__blockTableTd">{`${meterPrice?.median} руб.`}</div>
                  </div>
                </div>
              </>
            )}
            <div className="object__block-title-2">Стоимость квадратного метра аналогичных объектов:</div>
            <div className="blockInfo">
              {meterPrice?.min && (
                <>
                  <div className="minimalPrice">{`Минимум ${meterPrice?.min} руб`}</div>
                  <div className="middlePrice">{`В среднем ${meterPrice?.average} руб`}</div>
                  <div className="maximumPrice">{`Максимум ${meterPrice?.max} руб`}</div>
                </>
              )}
            </div>
            {priceRange && (
              <>
                <div className="object__block-title-2">Ценовой диапазон:</div>
                <div className="object__blockTable">
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Минимальная цена:</div>
                    <div className="object__blockTableTd">{`${priceRange?.[0]} руб.`}</div>
                  </div>
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Максимальная цена:</div>
                    <div className="object__blockTableTd">{`${priceRange?.[1]} руб.`}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>    
  )
}

export default Price
