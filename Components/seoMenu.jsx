import React from 'react'
import Link from 'next/link'

const SeoMenu = () => {
  return (
    <div className="pledge__sidebar">
    <div className="pledge__sidebar-wrapper">
      <div className="pledge__sidebar-title">Сервисы</div>
      {/* <div className="pledge__sidebar-statistic">
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
      </div> */}
      <div className="pledge__sidebar-nav">
        <Link  href="#">
          <a className="">
            <span>Проверка недвижимости</span>
          </a>
        </Link>
        <Link  href="#">
          <a className="">
            <span>Проверка собственника</span>
          </a>
        </Link>
        <Link  href="#">
          <a className="">
            <span>Реестр капитального ремонта</span>
          </a>
        </Link>
        <Link  href="/mkd">
          <a className="">
            <span>Реестр МКД</span>
          </a>
        </Link>
        <Link  href="/jkh">
          <a className="">
            <span>Реестр ЖКХ</span>
          </a>
        </Link>
      </div>
      <div className="pledge__sidebar-confirmation">
        <Link  href="/">
          <a className="">
            <span>Единый Реестр МКД РФ</span>
          </a>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default SeoMenu
