import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'

const Mkd = ({ cadastrObj }) => {
  const [value, setValue] = useState(false)
  const tryTouchPromise = async () => {
    const a = await cadastrObj
    setValue(a)
  }
  tryTouchPromise()
  // const {
  //   bldTitle, address, photos, wallMaterial, floorMaterial, elevatorCount, supplyTypeHeating,
  //   stations, maxFloor, supplyTypeHotWater, supplyTypeVent, bldArea, bldLivingArea,
  //   bldNonLivingArea, bldYear, supplyTypeGas, entranceCount, flatsCount, livingCount,
  //   bldProject, isAlarm
  // } = value?.price?.bld || value?.bld

  const oksType = value?.parcelData?.oksType
  const addresSspare = value?.price?.address || value?.address

  const bldTitle = value?.price?.bld?.bldTitle || value?.bld?.bldTitle
  const address = value?.price?.bld?.address || value?.bld?.address
  const photos = value?.price?.bld?.photos || value?.bld?.photos
  const wallMaterial = value?.price?.bld?.wallMaterial ||  value?.bld?.wallMaterial
  const floorMaterial = value?.price?.bld?.floorMaterial ||  value?.bld?.floorMaterial
  const elevatorCount = value?.price?.bld?.elevatorCount || value?.bld?.elevatorCount
  const supplyTypeHeating = value?.price?.bld?.supplyTypeHeating || value?.bld?.supplyTypeHeating
  const supplyTypeHotWater = value?.price?.bld?.supplyTypeHotWater || value?.bld?.supplyTypeHotWater
  const supplyTypeVent = value?.price?.bld?.supplyTypeVent || value?.bld?.supplyTypeVent
  const maxFloor = value?.price?.bld?.maxFloor || value?.bld?.maxFloor
  const bldArea = value?.price?.bld?.bldArea || value?.bld?.bldArea
  const bldLivingArea = value?.price?.bld?.bldLivingArea || value?.bld?.bldLivingArea
  const bldNonLivingArea = value?.price?.bld?.bldNonLivingArea || value?.bld?.bldNonLivingArea
  const bldYear = value?.price?.bld?.bldYear || value?.bld?.bldYear
  const supplyTypeGas = value?.price?.bld?.supplyTypeGas || value?.bld?.supplyTypeGas
  const entranceCount = value?.price?.bld?.entranceCount || value?.bld?.entranceCount
  const flatsCount = value?.price?.bld?.flatsCount || value?.bld?.flatsCount
  const livingCount = value?.price?.bld?.livingCount || value?.bld?.livingCount
  const bldProject = value?.price?.bld?.bldProject || value?.bld?.bldProject
  const stations = value?.price?.bld?.stations || value?.bld?.stations
  const isAlarm = value?.price?.bld?.isAlarm || value?.bld?.isAlarm

  const date = new Date().getFullYear()
  const buildingDamage = date - bldYear
  const [model, setModel] = useState(false)
  const [tempImg, setTempImg] = useState('')
  const getImg = (img) => {
    setTempImg(img)
    setModel(true)
  }
  const buildingState = (value) => {
    if ( value <= 20 ) { return <span className="greenState">Хорошее</span> }
    if ( value <= 40 ) { return <span className="yellowState">Удовлетворительное</span> }
    if ( value <= 60 ) { return <span className="orangeState">Неудовлетворительное</span> }
    return <span className="redState">Критическое</span>
 }


  return (
    <>
      {!value ? (
        <>
          {''}
          {/* <div className="searchTitle">Загружаем данные об объекте</div>
          <div className="spinner1" /> */}
        </>
      ) : (
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
                  {console.log('bldTitle', bldTitle)}
                  <b>{bldTitle}</b>
                </div>
              </div>
              )}
              {(address || addresSspare) && (
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Адрес</div>
                <div className="object__blockTableTd">{address || addresSspare}</div>
              </div>
              )}
              {bldYear && (
                <>
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Год постройки: </div>
                    <div className="object__blockTableTd">{bldYear} </div>
                  </div>
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Физический износ здания: </div>
                    <div className="object__blockTableTd">{buildingDamage}%</div>
                  </div>
                  <div className="object__blockTableTr">
                    <div className="object__blockTableTd">Оценка фактического состояния: </div>
                    <div className="object__blockTableTd">{buildingState(buildingDamage)}</div>
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
    )}
    </>
  )
}

export default Mkd
