import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux'

import './info.css'

const Mkd = () => {
  const {
    bldTitle, address, photos, wallMaterial, floorMaterial, elevatorCount, supplyTypeHeating,
    stations, maxFloor, supplyTypeHotWater, supplyTypeVent, bldArea, bldLivingArea,
    bldNonLivingArea, bldYear, supplyTypeGas, entranceCount, flatsCount, livingCount,
    bldProject
  } = useSelector((store) => store.flat?.getAskPrice?.bld)

  // const bldTitle = useSelector((store) => store.flat.getAskPrice?.bld?.bldTitle)
  // const address = useSelector((store) => store.flat.getAskPrice?.bld?.address)
  // const photos = useSelector((store) => store.flat.getAskPrice?.bld?.photos)
  // const wallMaterial = useSelector((store) => store.flat.getAskPrice?.bld?.wallMaterial)
  // const floorMaterial = useSelector((store) => store.flat.getAskPrice?.bld?.floorMaterial)
  // const elevatorCount = useSelector((store) => store.flat.getAskPrice?.bld?.elevatorCount)
  // const supplyTypeHeating = useSelector((store) => store.flat.getAskPrice?.bld?.supplyTypeHeating)
  // const supplyTypeHotWater = useSelector((store) => store.flat.getAskPrice?.bld?.supplyTypeHotWater)
  // const supplyTypeVent = useSelector((store) => store.flat.getAskPrice?.bld?.supplyTypeVent)
  // const maxFloor = useSelector((store) => store.flat.getAskPrice?.bld?.maxFloor)
  // const bldArea = useSelector((store) => store.flat.getAskPrice?.bld?.bldArea)
  // const bldLivingArea = useSelector((store) => store.flat.getAskPrice?.bld?.bldLivingArea)
  // const bldNonLivingArea = useSelector((store) => store.flat.getAskPrice?.bld?.bldNonLivingArea)
  // const bldYear = useSelector((store) => store.flat.getAskPrice?.bld?.bldYear)
  // const supplyTypeGas = useSelector((store) => store.flat.getAskPrice?.bld?.supplyTypeGas)
  // const entranceCount = useSelector((store) => store.flat.getAskPrice?.bld?.entranceCount)
  // const flatsCount = useSelector((store) => store.flat.getAskPrice?.bld?.flatsCount)
  // const livingCount = useSelector((store) => store.flat.getAskPrice?.bld?.livingCount)
  // const bldProject = useSelector((store) => store.flat.getAskPrice?.bld?.bldProject)
  // const stations = useSelector((store) => store.flat.getAskPrice?.bld?.stations)

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
        <div className="object__block-load">
          <div className="loader__table">
            <div className="loader__td">
              <div className="loader__img"> </div>
            </div>
          </div>
        </div>
        <div className="object__block-wrap">
          <div className="object__block-title _mkd">Информация о МКД:</div>
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
              <div className="object__blockTableTr">
                <div className="object__blockTableTd">Год постройки: </div>
                <div className="object__blockTableTd">{bldYear} </div>
              </div>
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
