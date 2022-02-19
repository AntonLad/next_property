import React, { useState } from 'react'
import { Link } from 'react-scroll'
// import './info.css'

const MenuLeft = ({ cadastrObj, askAboutFlat }) => {
  const [value, setValue] = useState(false)
  const [value1, setValue1] = useState(false)
  console.log('askAboutFlat', askAboutFlat )
  console.log('cadObjMenu', cadastrObj )
  const cadObj = JSON.parse(cadastrObj)
  
  const tryTouchPromise = async () => {
    const a = await askAboutFlat
    const b = await cadastrObj

    setValue(a)
    setValue1(b)
  }
  tryTouchPromise()
  
  const rights = cadObj?.rights?.realty?.rights
  const rightsCheck = rights?.filter((it) =>  it?.rightState === 1)
  const encumbrances = cadObj?.rights?.realty?.encumbrances
  const encumbrancesCheck = encumbrances?.filter((it) =>  it?.encmbState === 1)
  const stats = value?.price?.stats || value?.stats 
  const checker = value?.price?.address || value?.address 
  const oksType = cadObj?.parcelData?.oksType

 

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
          {rights && rightsCheck.length !== 0 && (
            <li data-type="zalog" className="object__leftMenu-link _success">
              <Link to="owners-info" smooth="true" activeClass="active" spy="true" duration={500}>Количество собственников</Link>
              {/* кол-во собств-в, тип(ипотека), дата регистрации rightRegDate, номер регистрации права rightNumber   */}
            </li>
          )}
          {encumbrances && encumbrancesCheck.length !== 0 && (
            <li data-type="arrest" className="object__leftMenu-link _success">
              <Link to="restrictions-info" smooth="true" activeClass="active" spy="true" duration={500}>Обременения, аресты</Link>
              {/* арест обременеия залог ипотека запере на регистрацию и ные ограничения или обременения  */}
            </li>
          )}
          <>
            {!value ? (
              <>
                {''}
              </>
            ) : (
              <>
                {(stats?.price && stats?.priceRange && stats?.min) && (
                  <li data-type="fnp" className="object__leftMenu-link _success">
                    <Link to="price-info" smooth="true" activeClass="active" spy="true" duration={500}>Оценка стоимости</Link>
                    {/* по максимуму поля stat из getask , рыночная стоимость, quality, площадь, квартиры проадеются в диапазоне () */}
                  </li>
                )}
                {checker && (
                  <li data-type="mkd" className="object__leftMenu-link _success">
                    {oksType === 'flat' ?
                      <Link to="mkd-info" smooth="true" activeClass="active" spy="true" duration={500}>Сведения о МКД</Link> :
                      <Link to="mkd-info" smooth="true" activeClass="active" spy="true" duration={500}>Дополнительные сведения об объекте</Link> 
                    }
                  </li>
                )}
                {checker && (
                  <li data-type="map" className="object__leftMenu-link _success">
                    <Link to="infrastructura" smooth="true" activeClass="active" spy="true" duration={500}>Инфраструктура</Link>
                    {/* по максимуму поля bld из getask , фотки */}
                  </li>
                )}
              </>
            )}
          </>   
        </ul>
        <div className="btn _pink object__leftMenu-btnFull js__objectLeftBtnReports">
          Получить полный отчёт
        </div>
      </div>
    </div>
  )
}

export default MenuLeft
