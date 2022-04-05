import React from 'react'

const SeoMenu = () => {
  return (
    <div className="pledge__sidebar">
    <div className="pledge__sidebar-wrapper">
      <div className="pledge__sidebar-title">Статистика реестра:</div>
      <div className="pledge__sidebar-statistic">
        <div className="pledge__sidebar-statistic-prop">
          <span>мкд:</span>
          <span>1 204 658</span>
        </div>
        <div className="pledge__sidebar-statistic-prop">
          <span>Квартир:</span>
          <span>98 567 832</span>
        </div>
        <div className="pledge__sidebar-statistic-prop">
          <span>Помещений:</span>
          <span>36 034 456</span>
        </div>
      </div>
      <div className="pledge__sidebar-nav">
        <a className="" href="#">
          <span>Проверка на арест</span>
        </a>
        <a className="" href="#">
          <span>Проверка на обременение</span>
        </a>
        <a className="_active" href="#">
          <span>Проверка собственника</span>
        </a>
        <a className="" href="#">
          <span>Проверка зем. участка</span>
        </a>
        <a className="" href="#">
          <span>Проверка кад. стоимости</span>
        </a>
        <a className="" href="#">
          <span>Узнать кад. номер по адресу</span>
        </a>
      </div>
      <div className="pledge__sidebar-confirmation">
        <span>Единый Реестр МКД РФ</span>
      </div>
    </div>
  </div>
  )
}

export default SeoMenu
