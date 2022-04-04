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

  const flor = (fl) => {
    if (fl >= 5 && fl <=20) {return 'этажей'}
    const regexp = /1$/g
    const checker = regexp.test(fl) 
    if (checker) {return 'этаж'}
    const regexp2 = /2$|3$|4$/g
    const checker2 = regexp2.test(fl)
    if (checker2) {return 'этажа'}
    return 'этажей' 
  }

  const paramInfo = {
    'Тип объекта': bldTitle && <b>{bldTitle}</b>,
    'Адрес:': address || addresSspare ,
    'Год постройки:': bldYear,
    'Физический износ здания:': bldYear && `${buildingDamage}%`,
    'Оценка фактического состояния:': bldYear && buildingState(buildingDamage),
    'Проект/серия:': bldProject,
    'Материал стен:': wallMaterial,
    'Перекрытия:': floorMaterial,
    'Количество помещений:': flatsCount,
    'Количество жилых помещений:': livingCount,
    'Количество лифтов:': elevatorCount,
    'Количество подъездов:': entranceCount,
    'Этажность:': maxFloor && `${maxFloor} ${flor(maxFloor)}`,
    'Отопление:': supplyTypeHeating,
    'Горячее водоснабжение:': supplyTypeHotWater,
    'Тип вентеляции:': supplyTypeVent,
    'Газоснабжение:': supplyTypeGas,
    'Площадь объекта:': bldArea && `${bldArea} кв.м`,
    'Жилая площадь:': bldLivingArea && `${bldLivingArea} кв.м`,
    'Нежилая площадь:': bldNonLivingArea && `${bldNonLivingArea} кв.м`
  }

  const outputObject = () => {
    return Object.keys(paramInfo).map((it) => {
      return paramInfo[it] && (
        <div key={it} className="object__blockTableTr">
          <div className="object__blockTableTd">{it}</div>
          <div className="object__blockTableTd">{paramInfo[it]}</div>
        </div>
      )
    })
  }

  const uniqueKey = () => (+new Date() + Math.random())
  const uniqueKey2 = () => (+new Date() +  Math.random())
  return (
    <>
      {!value ? (
        <>
          {''}
          {/* пока нет value ничего не выводим */}
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

            <div className="object__blockTable _first">
              {outputObject()}
              {stations && (
                <div className="object__blockTableTr">
                  <div className="object__blockTableTd">Ближайшие остановки ОТ или метро: </div>
                  <div className="object__blockTableTd">
                    {stations.map((it, ind) => {
                      return (
                        <div key={ind + uniqueKey()}>
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
                        <div className="pics" key={ind + uniqueKey2()} aria-hidden="true" onClick={() => { getImg(it) }}>
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
