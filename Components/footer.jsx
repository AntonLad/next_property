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
            <div className="footer__links-td">
              <div className="footer__links-title">Правовая информация</div>
              <div className="footer__links-data">
                <a href="/anti-corruption">Противодействие коррупции</a>
                <br />
                <a href="/politica-conf">Политика конфинденциальности</a>
                <br />
                <a href="/dogovor-oferta">Договор-оферта</a>
                <br />
                <a href="/sposoby-vozvrata-i-oplaty">Способы оплаты и возврата</a>
              </div>
            </div>
          </div>
          <div className="footer__top-line" />
          <div className="footer__top-contacts">
            <div className="footer__top-contactsTd">
              <div className="footer__top-contacts-title">Время работы:</div>
              <div className="footer__top-contacts-data">
                Понед.- Пятница с<br />
                10:00 до 17:00
              </div>
            </div>
            <div className="footer__top-contactsTd">
              <div className="footer__top-contacts-title">Официальные аккаунты:</div>
              <div className="footer__top-contacts-data __soc ob">
                <div className="footer__top-contacts-soc _vk" />
                <div className="footer__top-contacts-soc _ok" />
                <div className="footer__top-contacts-soc _yt" />
                <div className="footer__top-contacts-soc _fb" />
              </div>
            </div>
            <div className="footer__top-contactsTd">
              <div className="footer__top-contacts-title">Обращение на почту:</div>
              <div className="footer__top-contacts-data _email">info@cadastrservice.ru</div>
            </div>
            <div className="footer__top-contactsTd">
              <div className="footer__top-contacts-data ob">
                <div className="footer__top-contacts-download _google" />
                <div className="footer__top-contacts-download _apple" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer__content-small">
          <div className="footer__small-img" />
          <div className="footer__small-slog">Реестр сведений о недвижимости</div>
          <div className="footer__small-line" />
          {/* <div className="footer__small-address">
            107996, г.Москва, ул. Кузнецкий Мост, д. 16/5, стр. 1
          </div> */}
          <div className="footer__small-copy">
            © CADASTRSERVICE, 2022.
            <br />
            Все права защищены.
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}

export default Footer
