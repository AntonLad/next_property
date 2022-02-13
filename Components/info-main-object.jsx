import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useSelector } from 'react-redux'

// import './info.css'

const InfoMainObject = ({ cadastrObj }) => {
  const router = useRouter()
  const cadNumber = router.query.cadnumber
  console.log('CADASTROBJ INFOMAIN', cadastrObj)
  const { id } = cadastrObj.objectData
  const { addressNotes } = cadastrObj.objectData?.objectAddress
  const objectName = cadastrObj.objectData?.objectName ?? '0'
  const objectNameLetter = objectName[0]
  const { areaValue, utilByDoc } = cadastrObj.parcelData ?? {}



  // const localDataObject = JSON.parse(localStorage.getItem(`${cadNumber}`))
  // const { addressNote } = localDataObject.objectData?.objectAddress
  // const objectName = localDataObject.objectData?.objectName ?? '0'
  // const objectNameLetter = objectName[0]
  // const { objectId } = localDataObject
  // const { areaValue, utilByDoc } = localDataObject.parcelData ?? {}
  // const { name } = localDataObject.flatPrice.flat ?? {}
  // const { addressNote } = useSelector((store) => store.common.getAskReestrByCudNum?.objectData ?? {})
  // const objectName = useSelector((store) => store.common.getAskReestrByCudNum?.objectData?.objectName ?? '0')
  // const objectNameLetter = objectName[0]
  // const { objectId } = useSelector((store) => store.common.getAskReestrByCudNum ?? {})
  // const { areaValue, utilByDoc } = useSelector((store) => store.common.getAskReestrByCudNum.parcelData ?? {})
  // const { name } = useSelector((store) => store.common.flat?.getAskPrice?.flat ?? {})

  // useEffect(() => {
  //   const localData = JSON.parse(localStorage.getItem(`${cadNumber}`))
  //   console.log('SUPERSTORE', store)
  //   // dispatch(setInputCadastrResult(localData))
  //   // dispatch(setInputFlat(LocalFlat))
  //   // dispatch(setInputRights(LocalRights))
  //   // console.log('LocalFlat', LocalFlat)
  // }, [])

  return (
    <div>
      <div className="object__content-top">
        <div className="object__content-top-link _print ob">
          <span>Печать</span>
        </div>
        <div className="object__content-top-link _favorite ob">
          <span>В избранное</span>
        </div>
        <div className="object__content-top-link">Дата запроса:&nbsp;&nbsp;27.01.2022</div>
        <div className="object__content-top-link ob">
          <span>Обновить</span>
        </div>
      </div>
      <div data-content="main" className="object__block" id="main">
        <div className="object__block-title _h1">
          Объект недвижимости № {id}{' '}
        </div>
        <div className="clearfix"> </div>
        <div className="object__blockTable">
          {addressNotes && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Адрес:</div>
            <div className="object__blockTableTd">{addressNotes}</div>
          </div>
          )}
          {id && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Кадастровый номер:</div>
            <div className="object__blockTableTd">{id}</div>
          </div>
          )}
          {objectNameLetter !== '0' && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип объекта:</div>
              {/* <div className="object__blockTableTd">{name || objectName}</div> */}
            </div>
          )}
          {(utilByDoc) && (
            <div className="object__blockTableTr">
              <div className="object__blockTableTd">Тип использования:</div>
              <div className="object__blockTableTd">{utilByDoc}</div>
            </div>
          )}
          {areaValue && (
          <div className="object__blockTableTr">
            <div className="object__blockTableTd">Площадь:</div>
            <div className="object__blockTableTd">{`${areaValue} кв. м.`}</div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default InfoMainObject
