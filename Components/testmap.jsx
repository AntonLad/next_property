import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { YMaps, Map, TypeSelector, ZoomControl, FullscreenControl, Placemark, Circle} from 'react-yandex-maps';


const testMap = ({ cadastrObj }) => {
  const [value, setValue] = useState(false)
  console.log('TESTMAPPROPS', value)
  const router = useRouter()
  const info = router.query.cadnumber
  const [range, setRange] = useState(200)
  const lat = value?.price?.bld?.pos?.lat || value?.bld?.pos?.lat
  const lng = value?.price?.bld?.pos?.lng || value?.bld?.pos?.lng
  const address = value?.bld?.address
  const social = value?.structures || value?.getAskStructure?.social


  const tryTouchPromise = async () => {
    const a = await cadastrObj
    setValue(a)
  }

  tryTouchPromise()

  // const categoryAssets = {
  //   products: {
  //     name: 'Продукты',
  //     icon: 'shopMarker'
  //   },
  //   education: {
  //     name: 'Образование',
  //     icon: 'education'
  //   },
  //   medicine: {
  //     name: 'Медицина',
  //     icon: 'medicine1'
  //   },
  //   sport: {
  //     name: 'Спорт',
  //     icon: 'sport1'
  //   },
  //   fun: {
  //     name: 'Развлечения',
  //     icon: 'fun'
  //   }
  // }

  // const listOfSocialOjects = (socialList, distance) => {
  //   return Object.keys(socialList).reduce((acc, socialCategory) => {
  //     const { category, items } = social.find((socObj) => {
  //       return socObj.category === socialList[socialCategory].name
  //     })
  //     const listOfSocialObjects = items
  //       .map((socialObject) => {
  //         return {
  //           title: socialObject.title,
  //           subtitle: socialObject.subtitle,
  //           address: socialObject.address,
  //           distance: socialObject.distance,
  //           lat: socialObject.pos.lat,
  //           lng: socialObject.pos.lng
  //         }
  //       })
  //       .filter((it) => it.distance <= distance)
  //     acc[socialCategory] = {
  //       name: category,
  //       icon: socialList[socialCategory].icon,
  //       list: listOfSocialObjects
  //     }
  //     return acc
  //   }, {})
  // }

  // const getAddMarkers2 = (socialObjects) => {
  //   Object.keys(socialObjects).forEach((categoryName) => {
  //     socialObjects[categoryName].list.forEach((it) => {
  //       return {
  //         lat: it.pos.lat,
  //         lng: it.pos.lng,
  //         title: it.title,
  //         subtitle: it.subtitle,
  //         address: it.address,
  //       }
  //     })
  //   })
  // }

  // listOfSocialOjects(categoryAssets, range)

  const uniqueKey = () => (+new Date())
  const landsShop = 'islands#blueShoppingIcon'
  const landsEducation = 'islands#blueEducationIcon'
  const landsMedic = 'islands#blueMedicalIcon'
  const landsSport = 'islands#blueSportIcon'
  const landsFun = 'islands#blueTheaterIcon'


  return (
    <>
      {!value ? (
        <>
          <div className="searchTitle">Загружаем карту</div>
          <div className="spinner1" />
        </>
      ) : (
        <div className="object__block">
          <div id="infrastructura" className="object__block-title _map">Социальная инфраструктура</div>
          <div className="mapButtons">
            <button
              type="button"
              className="mapBtn green"
              onClick={() => {
                setRange(200)
              }}
            >
              200м
            </button>
            <button
              type="button"
              className="mapBtn yellow"
              onClick={() => {
                setRange(500)
              }}
            >
              500м
            </button>
            <button
              type="button"
              className="mapBtn red"
              onClick={() => {
                setRange(1000)
              }}
            >
              1000м
            </button>
          </div>
          <YMaps>
            <div className="mapContainer">
              <Map defaultState={{ center: [lat, lng], zoom: 14 }} width="100%" height="400px">
                <TypeSelector options={{ float: 'right' }} />
                <ZoomControl options={{ float: 'right' }} />
                <FullscreenControl />
                <Placemark
                  geometry={[lat, lng]}
                  options={{
                    preset: 'islands#blueHomeIcon'
                  }}
                />
                {social.slice(0, -1).map((it, ind) => {
                  return (
                    <div key={ind}>
                      {it?.items[0]?.distance < range && (
                        <div key={uniqueKey()}>
                          {it.items.filter((distance) => distance.distance <= range).map((dataOfObject, index) => {
                            return (
                              <div key={`${index + uniqueKey()}`}>
                                {/* {range < 200 ? lands = 'islands#darkGreenDotIcon' : lands = 'islands#yellowDotIcon'} */}
                                
                                  <Placemark
                                  geometry={[dataOfObject.pos.lat, dataOfObject.pos.lng]}
                                  options={{
                                    preset: it.category === 'Продукты' ? landsShop 
                                      : it.category === 'Образование' ? landsEducation
                                        : it.category === 'Медицина' ? landsMedic
                                          : it.category === 'Спорт' ? landsSport
                                            : it.category === 'Развлечения' ? landsFun : 'islands#blueHomeIcon',
                                    
                                    iconGlyphColor: 'red'
                                  }}
                                />

                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                 })}
                <Circle
                  geometry={[[lat, lng], 1000]}
                  options={{
                    draggable: true,
                    fillColor: '#ff666677',
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWidth: 3,
                  }}
                />
                <Circle
                  geometry={[[lat, lng], 500]}
                  options={{
                    draggable: true,
                    fillColor: '#FFFF0077',
                    strokeColor: '#FFFF00',
                    strokeOpacity: 0.8,
                    strokeWidth: 3,
                  }}
                />
                <Circle
                  geometry={[[lat, lng], 200]}
                  options={{
                    draggable: true,
                    fillColor: '#00800077',
                    strokeColor: '#008000',
                    strokeOpacity: 0.8,
                    strokeWidth: 3,
                  }}
                />
              </Map>
            </div>
          </YMaps>
          {/* добавление объектов инфраструктуры - начало */}
          {social.slice(0, -1).map((it, ind) => {
            return (
              <div key={ind}>
                {it?.items[0]?.distance < range && (
                  <div>
                    <div key={uniqueKey()} className="object__block-title-2 products">{it.category}</div>
                    <div className="object__blockTable">
                      {it.items.filter((distance) => distance.distance <= range).map((item, index) => {
                        return (
                          <div key={`${index + uniqueKey()}`} className="object__blockTableTr">
                            <div className="object__blockTableTd map">
                              <span className="titleOfitem">
                                {`"${item.title}"`}
                              </span>
                              <span>
                                {`   ${item.subtitle}`}
                              </span>
                            </div>
                            <div className="object__blockTableTd map">{item?.address}</div>
                            <div className="object__blockTableTd map">{`${item?.distance} м.`}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
export default testMap

