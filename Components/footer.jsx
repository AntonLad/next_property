import React from 'react'

const Footer = () => {
  return (
    <div className="footer__top">
      <div className="content">
        <div className="footer__content-big">
          <div className="footer__links-table">
            <div className="footer__links-td">
              <div className="footer__links-title">Навигация</div>
              <div className="footer__links-data">
                <a href="#">Главная</a>
                <br />
                <a href="#">Контакты</a>
                <br />
                <a href="#">Политика конфиденциальности</a>
                <br />
                <a href="#">Пользовательское соглашение</a>
                <br />
                <a href="#">Оферта</a>
                <br />
              </div>
            </div>
            <div className="footer__links-td">
              <div className="footer__links-title">Онлайн сервисы</div>
              <div className="footer__links-data">
                <a href="#">Проверка квартиры</a>
                <br />
                <a href="#">Проверка участка</a>
                <br />
                <a href="#">Проверка собственника</a>
                <br />
                <a href="#">Реестр МКД</a>
                <br />
                <a href="#">Реестр капитального ремонта МКД</a>
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
