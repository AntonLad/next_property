import React from 'react'
import Link from "next/link"

export const NavLinks = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">
            <a className="header__menu-link">
              Главная
            </a>
          </Link>
        </li>
        <li>
          <Link href="/jkh">
            <a className="header__menu-link">
              Реестр ЖКХ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/mkd">
            <a className="header__menu-link" >
              Реестр МКД
            </a>
          </Link>
        </li>
        <li>
          <Link  href="#">
            <a className="header__menu-link">
            Капитальный ремонт
            </a>
          </Link>
        </li>
        <li>
          <Link  href="#">
            <a className="header__menu-link">
              Контакты
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavLinks





