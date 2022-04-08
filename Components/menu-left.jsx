import React, { useState } from 'react'
import { Link } from 'react-scroll'
// import './info.css'

const MenuLeft = ({ cadastrObj, askAboutFlat, jkhObj }) => {
  const [value, setValue] = useState(false)
  const cadObj = JSON.parse(cadastrObj)
  const jkh = JSON.parse(jkhObj)

  const tryTouchPromise = async () => {
    const a = await askAboutFlat
    setValue(a)
  }
  tryTouchPromise()

  const bldYear = value?.price?.bld?.bldYear || value?.bld?.bldYear
  const bldTitle = value?.price?.bld?.bldTitle || value?.bld?.bldTitle
  const stations = value?.price?.bld?.stations || value?.bld?.stations
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
      <div className="menuHead">Сведения из реестра</div>
        <ul className="object__leftMenu-links">
          <li data-type="owners" className="object__leftMenu-link _success">
            <Link to="main" smooth="true" activeClass="active" spy={true} duration={500}>Информация об объекте</Link>
          </li>
          <li data-type="kadastr" className="object__leftMenu-link _success">
            <Link to="kadastr-info" smooth="true" activeClass="active" spy={true} duration={500}>Кадастровые сведения</Link>
          </li>
          {rights && rightsCheck.length !== 0 && (
            <li data-type="zalog" className="object__leftMenu-link _success">
              <Link to="owners-info" smooth="true" activeClass="active" spy={true} duration={500}>Количество собственников</Link>
            </li>
          )}
          {encumbrances && encumbrancesCheck.length !== 0 && (
            <li data-type="arrest" className="object__leftMenu-link _success">
              <Link to="restrictions-info" smooth="true" activeClass="active" spy={true} duration={500}>Обременения, аресты</Link>
            </li>
          )}
          <>
            {!value ? (
              <>
                {''}
              </>
            ) : (
              <>
                {(stats?.price || stats?.priceRange || stats?.min) && (
                  <li data-type="fnp" className="object__leftMenu-link _success">
                    <Link to="price-info" smooth="true" activeClass="active" spy={true} duration={500}>Оценка стоимости</Link>
                  </li>
                )}
                {(bldYear || bldTitle || stations) && checker &&  (
                  <li data-type="mkd" className="object__leftMenu-link _success">
                    {oksType === 'flat' ?
                      <Link to="mkd-info" smooth="true" activeClass="active" spy={true} duration={500}>Сведения о МКД</Link> :
                      <Link to="mkd-info" smooth="true" activeClass="active" spy={true} duration={500}>Дополнительные сведения об объекте</Link>
                    }
                  </li>
                )}
                {jkh && (
                  <li data-type="arrest" className="object__leftMenu-link _success">
                    <Link to="jkh" smooth="true" activeClass="active" spy={true} duration={500}>Управляющая компания</Link>
                  </li>
                )}
                {checker && (
                  <li data-type="map" className="object__leftMenu-link _success">
                    <Link to="infrastructura" smooth="true" activeClass="active" spy={true} duration={500}>Инфраструктура</Link>
                  </li>
                )}
              </>
            )}
          </>
        </ul>
        {/* <div className="btn">
          Получить полный отчёт
        </div> */}
      </div>
    </div>
  )
}

export default MenuLeft
