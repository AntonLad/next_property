import React from 'react'

// import { useSelector } from 'react-redux'

// import './info.css'

const Restriction = () => {
  return (
    <div data-content="arrest" id="restrictions-info" className="object__block">
      <div className="object__block-wrap">
        <div className="object__block-title _restriction">Обременения и ограничения:</div>
        <div className="clearfix"> </div>
        <div className="object__block-data">
          <div className="object__block-data-wrap">
            <div className="object__block-data-item _success">
              <div className="object__block-data-item-title">
                Наложение ареста на объект
                <span
                  title="Проверка наложения ареста на объект государственными органами или по решению суда. Данные актуальны на дату запроса. Проверьте дату."
                  className="question object__block-data-item-q"
                >
                  1
                </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Записи отсутствуют</div>
              </div>
            </div>
            <div className="object__block-data-item _success">
              <div className="object__block-data-item-title">
                Обременения или ограничения
                <span
                  title="Проверка наложения ареста на объект государственными органами или по решению суда. Данные актуальны на дату запроса. Проверьте дату."
                  className="question object__block-data-item-q"
                >
                  1
                </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Записи отсутствуют</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Правопритязания на объект{' '}
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Недвижимость в ипотеке
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Записи о сдачи в аренду <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            {/* <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Решение об изъятие квартиры для государства
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Запрет на регистрацию без личного участия
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Возражения о регистрации права
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div>
            <div className="object__block-data-item">
              <div className="object__block-data-item-title">
                Иные ограничения или обременения
                <span className="question object__block-data-item-q"> </span>
              </div>
              <div className="object__block-data-item-lock">
                <div className="object__block-data-item-lock-block">Данные по запросу</div>
              </div>
            </div> */}
          </div>
          {/* <div className="object__block-data-info">
            Для получения информации только из этого блока вы можете заказать
            <span className="a _blue _inner ob">
              отчет “Проверка на обременение, арест, залог и ФНП”
            </span>{' '}
            или
            <span className="a _blue _inner ob">полную проверку объекта</span>
          </div>
          <div className="object__block-data-discl">
            Данные о наличии всех ограничений отображается на дату выгрузки и могут быть не
            актуальными на текущий день. Обновленные сведения выгружаются по запросу, взымается
            плата согласно тарифам.
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Restriction
