import React from 'react'
import Link from "next/link"
import MobileNavigation from './mobile-navigation'
import Navigation from './navigation'

const Header = () => {
  return (
    <div className="header__bottom">
      <div className="content">
        <Link href="/">
          <a className="header__logo">
            <div className="header__logo-img" />
            <div className="header__logo-text">
              <div className="header__logo-title">mkdfond</div>
              <div className="header__logo-descr">Сервис проверки недвижимости</div>
            </div>
          </a>
        </Link>
          <Navigation />
          <MobileNavigation />
        <div className="header__mobileBtn js__headerMobileBtn" />
      </div>
    </div>
  )
}

export default Header
