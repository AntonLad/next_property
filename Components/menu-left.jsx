import React from 'react'
import { Link } from 'react-scroll'
// import './info.css'

const MenuLeft = ({cadastrObj}) => {
  const rights = cadastrObj?.rights?.realty?.rights[0]
  const encumbrances = cadastrObj?.rights?.realty?.encumbrances
  const stats = cadastrObj?.price?.stats
  const checker = cadastrObj?.price?.address

  return (
    <div className="object__leftMenu">
      <div className="object__leftMenu-wrap">
        <ul className="object__leftMenu-links">
          <li data-type="owners" className="object__leftMenu-link _success">
            <Link to="main" smooth="true" activeClass="active" spy="true" duration={500}>Информация об объекте</Link>
          </li>
          <li data-type="kadastr" className="object__leftMenu-link _success">
            <Link to="kadastr-info" smooth="true" activeClass="active" spy="true" duration={500}>Кадастровые сведения</Link>
            {/* данные из ключа address+: кадастр номер, тип объекта, адрес, площадь, дата утверждения кадастр стоимость, кадастр стоимость, этаж , кол-ком, infoUpdateDate - время обновления инфо */}
          </li>
          {rights && rights.rightState === 1 && (
            <li data-type="zalog" className="object__leftMenu-link _success">
              <Link to="owners-info" smooth="true" activeClass="active" spy="true" duration={500}>Количество собственников</Link>
              {/* кол-во собств-в, тип(ипотека), дата регистрации rightRegDate, номер регистрации права rightNumber   */}
            </li>
          )}
          {encumbrances && (
            <li data-type="arrest" className="object__leftMenu-link _success">
              <Link to="restrictions-info" smooth="true" activeClass="active" spy="true" duration={500}>Обременения, аресты</Link>
              {/* арест обременеия залог ипотека запере на регистрацию и ные ограничения или обременения  */}
            </li>
          )}
          {stats && (
            <li data-type="fnp" className="object__leftMenu-link _success">
              <Link to="price-info" smooth="true" activeClass="active" spy="true" duration={500}>Оценка стоимости</Link>
              {/* по максимуму поля stat из getask , рыночная стоимость, quality, площадь, квартиры проадеются в диапазоне () */}
            </li>
          )}
          {checker && (
            <li data-type="mkd" className="object__leftMenu-link _success">
              <Link to="mkd-info" smooth="true" activeClass="active" spy="true" duration={500}>Сведения о МКД</Link>
              {/* по максимуму поля bld из getask , фотки */}
            </li>
          )}
          {checker && (
            <li data-type="map" className="object__leftMenu-link _success">
              <Link to="infrastructura" smooth="true" activeClass="active" spy="true" duration={500}>Инфраструктура</Link>
              {/* по максимуму поля bld из getask , фотки */}
            </li>
          )}
        </ul>
        <div className="btn _pink object__leftMenu-btnFull js__objectLeftBtnReports">
          Получить полный отчёт
        </div>
      </div>
    </div>
  )
}

export default MenuLeft
