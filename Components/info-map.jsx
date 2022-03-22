import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DG from '2gis-maps'
// import foto from '../.next/static/media/marker1.png'


const Map = ({ cadastrObj }) => {
  const [value, setValue] = useState(false)
  const router = useRouter()
  const info = router.query.cadnumber
  const [range, setRange] = useState(200)
  const lat = value.price?.bld?.pos?.lat
  const lng = value.price?.bld?.pos?.lng
  const address = value.price?.bld?.address
  const social = value?.structures

  const tryTouchPromise = async () => {
    const a = await cadastrObj
    setValue(a)
  }

  tryTouchPromise()

  const categoryAssets = {
    products: {
      name: 'Продукты',
      icon: 'shopMarker'
    },
    education: {
      name: 'Образование',
      icon: 'education'
    },
    medicine: {
      name: 'Медицина',
      icon: 'medicine1'
    },
    sport: {
      name: 'Спорт',
      icon: 'sport1'
    },
    fun: {
      name: 'Развлечения',
      icon: 'fun'
    }
  }

  const listOfSocialOjects = (socialList, distance) => {
    return Object.keys(socialList).reduce((acc, socialCategory) => {
      const { category, items } = social.find((socObj) => {
        return socObj.category === socialList[socialCategory].name
      })
      const listOfSocialObjects = items
        .map((socialObject) => {
          return {
            title: socialObject.title,
            subtitle: socialObject.subtitle,
            address: socialObject.address,
            distance: socialObject.distance,
            pos: socialObject.pos,
          }
        })
        .filter((it) => it.distance <= distance)
      acc[socialCategory] = {
        name: category,
        icon: socialList[socialCategory].icon,
        list: listOfSocialObjects
      }
      return acc
    }, {})
  }

  
  useEffect(() => {
     map = DG.map('mapContainer', {
      center: [`${lat}`, `${lng}`],
      zoom: 16
    })
  }, [])
  useEffect(() => {
    if (map !== null || map === undefined) {
      map.remove()
    }
    map = DG.map('mapContainer', {
      center: [`${lat}`, `${lng}`],
      zoom: 14
    })

    const icon = DG.icon({
      iconUrl: '/images/marker1.png',
      iconSize: [21, 32]
    })
    DG.marker([`${lat}`, `${lng}`], { icon }).addTo(map).bindPopup(`${address}`)
    DG.circle([`${lat}`, `${lng}`], { radius: 200, color: '#00ff00' }).addTo(map)
    DG.circle([`${lat}`, `${lng}`], { radius: 500, color: '#ffb300' }).addTo(map)
    DG.circle([`${lat}`, `${lng}`], { radius: 1000, color: '#ff0000' }).addTo(map)

    // const getAddMarkers = (objectsArray, icons) => {
    //   objectsArray.forEach((it) => {
    //     const marker = DG.icon({
    //       iconUrl: `../assets/images/${icons}.png`,
    //       iconSize: [21, 32]
    //     })
    //     return DG.marker([`${it.pos.lat}`, `${it.pos.lng}`], { icon: marker })
    //       .addTo(map)
    //       .bindPopup(`"${it.title}" <br /> ${it.subtitle} <br /> ${it.address}`)
    //   })
    // }

    const getAddMarkers2 = (socialObjects) => {
        Object.keys(socialObjects).forEach((categoryName) => {
        const marker = DG.icon({
          iconUrl: `/images/${socialObjects[categoryName].icon}.png`,
          iconSize: [21, 32]
        })
        socialObjects[categoryName].list.forEach((it) => {
          return DG.marker([`${it.pos.lat}`, `${it.pos.lng}`], { icon: marker })
            .addTo(map)
            .bindPopup(`"${it.title}" <br /> ${it.subtitle} <br /> ${it.address}`)
        })
      })
    }

    getAddMarkers2(listOfSocialOjects(categoryAssets, range))
  }, [range])

  const uniqueKey = () => (+new Date())
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
          <div id="mapContainer" className="mapContainer" />

          {/* добавление объектов инфраструктуры - начало */}
          {social.map((it, ind) => {
            return (
              <div key={it.category}>
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
export default Map
