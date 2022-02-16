import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'

const Mkd = ({ cadastrObj }) => {
  const {
    bldTitle, address, photos, wallMaterial, floorMaterial, elevatorCount, supplyTypeHeating,
    stations, maxFloor, supplyTypeHotWater, supplyTypeVent, bldArea, bldLivingArea,
    bldNonLivingArea, bldYear, supplyTypeGas, entranceCount, flatsCount, livingCount,
    bldProject, isAlarm
  } = cadastrObj.price?.bld
  const oksType = cadastrObj?.parcelData?.oksType

  // const bldTitle = cadastrObj.price?.bld?.bldTitle
  // const address = cadastrObj.price?.bld?.address
  // const photos = cadastrObj.price?.bld?.photos
  // const wallMaterial = cadastrObj.price?.bld?.wallMaterial
  // const floorMaterial = cadastrObj.price?.bld?.floorMaterial
  // const elevatorCount = cadastrObj.price?.bld?.elevatorCount
  // const supplyTypeHeating = cadastrObj.price?.bld?.supplyTypeHeating
  // const supplyTypeHotWater = cadastrObj.price?.bld?.supplyTypeHotWater
  // const supplyTypeVent = cadastrObj.price?.bld?.supplyTypeVent
  // const maxFloor = cadastrObj.price?.bld?.maxFloor
  // const bldArea = cadastrObj.price?.bld?.bldArea
  // const bldLivingArea = cadastrObj.price?.bld?.bldLivingArea
  // const bldNonLivingArea = cadastrObj.price?.bld?.bldNonLivingArea
  // const bldYear = cadastrObj.price?.bld?.bldYear
  // const supplyTypeGas = cadastrObj.price?.bld?.supplyTypeGas
  // const entranceCount = cadastrObj.price?.bld?.entranceCount
  // const flatsCount = cadastrObj.price?.bld?.flatsCount
  // const livingCount = cadastrObj.price?.bld?.livingCount
  // const bldProject = cadastrObj.price?.bld?.bldProject
  // const stations = cadastrObj.price?.bld?.stations
  // const isAlarm = cadastrObj.price?.bld?.isAlarm

  const date = new Date().getFullYear()
  const [model, setModel] = useState(false)
  const [tempImg, setTempImg] = useState('')
  const getImg = (img) => {
    setTempImg(img)
    setModel(true)
  }

  return (
    <>
      <div className={model ? 'model open' : 'model'}>
        <img src={tempImg} alt="" aria-hidden="true" onClick={() => setModel(false)} />
        <CloseIcon onClick={() => setModel(false)} />
      </div>
      <div data-content="mkd" id="mkd-info" className="object__block">
        <div className="object__block-wrap">
          {oksType === 'flat' ? 
            <div className="object__block-title _mkd">Информация о МКД</div> : 
            <div className="object__block-title _mkd">Дополнительные сведения об объекте</div>
          }
          {isAlarm && (
            <div className="attention">
              Внимание! дом признан аварийным
            </div>
          )}
          <div className="clearfix"> </div>
          <div className="object__blockTable _first">
            {bldTitle && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип объекта</div>
              <div className="object__blockTableTd">
                <b>{bldTitle}</b>
              </div>
            </div>
            )}
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Адрес</div>
              <div className="object__blockTableTd">{address}</div>
            </div>
            {bldYear && (
              <>
                <div className="object__blockTableTr">
                  <div className="object__blockTableTd">Год постройки: </div>
                  <div className="object__blockTableTd">{bldYear} </div>
                </div>
                <div className="object__blockTableTr">
                  <div className="object__blockTableTd">Физический износ здания: </div>
                  <div className="object__blockTableTd">{date - bldYear}%</div>
                </div>
              </>
            )}
            {bldProject && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Проект/серия: </div>
                <div className="object__blockTableTd">{bldProject} </div>
              </div>
            )}
            {wallMaterial && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Материал стен: </div>
                <div className="object__blockTableTd">{wallMaterial} </div>
              </div>
            )}
            {floorMaterial && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Перекрытия: </div>
                <div className="object__blockTableTd">{floorMaterial} </div>
              </div>
            )}
            {flatsCount && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Количество помещений: </div>
                <div className="object__blockTableTd">{flatsCount} </div>
              </div>
            )}
            {livingCount && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Количество жилых помещений: </div>
                <div className="object__blockTableTd">{livingCount} </div>
              </div>
            )}
            {(elevatorCount || elevatorCount === 0) && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Количество лифтов: </div>
                <div className="object__blockTableTd">{elevatorCount} </div>
              </div>
            )}
            {entranceCount && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Количество подъездов: </div>
                <div className="object__blockTableTd">{entranceCount} </div>
              </div>
            )}
            {maxFloor && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Этажность: </div>
                <div className="object__blockTableTd">{`${maxFloor} эт`} </div>
              </div>
            )}
            {supplyTypeHeating && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Отопление: </div>
                <div className="object__blockTableTd">{supplyTypeHeating} </div>
              </div>
            )}
            {supplyTypeHotWater && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Горячее водоснабжение: </div>
                <div className="object__blockTableTd">{supplyTypeHotWater} </div>
              </div>
            )}
            {supplyTypeVent && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Тип вентеляции: </div>
                <div className="object__blockTableTd">{supplyTypeVent} </div>
              </div>
            )}
            {supplyTypeGas && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Газоснабжение: </div>
                <div className="object__blockTableTd">{supplyTypeGas} </div>
              </div>
            )}
            {bldArea && (
              <>
                <div className="object__blockTableTr">
                  <div className="object__blockTableTd">Площадь объекта: </div>
                  <div className="object__blockTableTd">{`${bldArea} кв.м` }</div>
                </div>
                {bldLivingArea && (
                <div className="object__blockTableTr">
                  <div className="object__blockTableTd">Жилая площадь: </div>
                  <div className="object__blockTableTd">{`${bldLivingArea} кв.м`} </div>
                </div>
                )}
                {bldNonLivingArea && (
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Не жилая площадь: </div>
                    <div className="object__blockTableTd">{`${bldNonLivingArea} кв.м`} </div>
                  </div>
                )}
              </>
            )}
            {stations && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Ближайшие остановки ОТ или метро: </div>
                <div className="object__blockTableTd">
                  {stations.map((it, ind) => {
                    return (
                      <div key={ind}>
                        {it?.type} {` - ${it?.name}`} {it?.comment ? ` - ${it?.comment}` : '1'}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {photos && (
              <div className="photoContainer">
                <div className="photoTitle">Фото объекта:</div>
                <div className="foto">
                  {photos.map((it, ind) => {
                    return (
                      <div className="pics" key={ind} aria-hidden="true" onClick={() => { getImg(it) }}>
                        <img src={it} alt="bld" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mkd
