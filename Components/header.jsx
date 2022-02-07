import React from 'react'
// import { Link } from 'react-router-dom'
// import Link from "next/link"

const Header = () => {
  return (
    <div className="header__bottom">
      <div className="content">
        <a href="/" className="header__logo">
          <div className="header__logo-img" />
          <div className="header__logo-text">
            <div className="header__logo-title">CadastrService</div>
            <div className="header__logo-descr">Сервис проверки недвижимости</div>
          </div>
        </a>
        <nav className="header__menu">
          <a className="header__menu-link" href="#">
            Проверка недвижимости
          </a>
          <a className="header__menu-link" href="#">
            Реестр МКД
          </a>
          <a className="header__menu-link" href="#">
            Капитальный ремонт
          </a>
          <a className="header__menu-link" href="#">
            Контакты
          </a>
        </nav>
        <div className="header__mobileBtn js__headerMobileBtn" />
      </div>
    </div>
  )
}

export default Header
