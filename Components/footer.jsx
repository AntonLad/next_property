import React from 'react'
import Link from "next/link"

const Footer = () => {
  return (
    <div className="footer__top">
      <div className="content">
        <div className="footer__content-big">
          <div className="footer__links-table">
            <div className="footer__links-td">
              <div className="footer__links-title">Навигация</div>
              <div className="footer__links-data">
                <Link href="/">
                  <a>Главная</a>
                </Link>
                <br />
                <Link href="/">
                  <a>Контакты</a>
                </Link>
                <br />
                <Link href="/privacy-policy">
                  <a>Политика конфиденциальности</a>
                </Link>
                <br />
                <Link href="/agreement">
                  <a>Пользовательское соглашение`</a>
                </Link>
                <br />
                <Link href="/public-offer">
                  <a>Оферта</a>
                </Link>
                <br />
              </div>
            </div>
            <div className="footer__links-td">
              <div className="footer__links-title">Онлайн сервисы</div>
              <div className="footer__links-data">
                <Link href="/">
                  <a>Проверка квартиры</a>
                </Link>
                <br />
                <Link href="/">
                  <a>Проверка участка</a>
                </Link>
                <br />
                <Link href="/">
                  <a>Проверка собственника</a>
                </Link>
                <br />
                <Link href="/mkd">
                  <a>Реестр МКД</a>
                </Link>
                <br />
                <Link href="/">
                  <a>Реестр капитального ремонта</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__content-small">
          <div className="footer__small-img" />
          <div className="footer__small-slog">Реестр сведений о недвижимости</div>
          <div className="footer__small-copy">
            MKDFOND, 2022. Все права защищены.
            email: admin@mkdfond.ru
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}

export default Footer
