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
                <a href="/o-rabote-portala">О портале</a>
                <br />
                <a href="/tekhnicheskaya-podderzhka">Тех. поддержка</a>
                <br />
                <a href="/otvety-na-chastyye-voprosy">Ответы на частые вопросы</a>
                <br />
                <a className="ob">Пресс-служба</a>
                <br />
                <a className="ob">Новости</a>
              </div>
            </div>
            <div className="footer__links-td">
              <div className="footer__links-title">Онлайн сервисы</div>
              <div className="footer__links-data">
                <a href="/moy-zakaz">Проверить статус заказа</a>
                <br />
                <a href="/proverit-sobstvennika-kvartiry">Проверка собственника</a>
                <br />
                <a href="/proveit-kadastroviy-nomer-zemelnogo-uchastka">Проверка зем. участка</a>
                <br />
                <a href="/uvedomlenie-o-zaloge">Добавление данных</a>
                <br />
                <a href="/udalit-zapis-v-reestre">Исключение из реестра</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__content-small">
          <div className="footer__small-img" />
          <div className="footer__small-slog">Реестр сведений о недвижимости</div>
          <div className="footer__small-copy">
            CADASTRSERVICE, 2022. Все права защищены.
            email: admin@cadastrservice.ru
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}

export default Footer
