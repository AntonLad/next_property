import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DG from '2gis-maps'
// import './info.css'

let map
const Map = () => {
  const { info } = useParams()
  console.log('INFO', info)
  const [range, setRange] = useState(200)
  const lat = (useSelector((store) => store.flat.getAskPrice?.bld?.pos?.lat))
  const lng = (useSelector((store) => store.flat.getAskPrice?.bld?.pos?.lng))
  const address = useSelector((store) => store.flat.getAskPrice?.bld?.address)
  const social = useSelector((store) => store.flat.getAskPrice.getAskStructure?.social)
  // const [mapInitialized, setMapInitialized] = useState('')

  // function mapping(value, distance) {
  //   return social[value].items.map((it) => {
  //     return {
  //       title: it.title,
  //       subtitle: it.subtitle,
  //       address: it.address,
  //       distance: it.distance,
  //       pos: it.pos
  //     }
  //   }).filter((it) => {
  //     return it.distance <= distance
  //   })
  // }

  // const socialObjectsProducts = (meters) => mapping(0, meters)
  // const socialObjectsEducation = (meters) => mapping(1, meters)
  // const socialObjectsMedicine = (meters) => mapping(2, meters)
  // const socialObjectsSport = (meters) => mapping(3, meters)
  // const socialObjectsFun = (meters) => mapping(4, meters)

  // social = [
  //   {
  //     category: '',
  //     items: []
  //   },
  // ]

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
      zoom: 14
    })
  }, [])
  useEffect(() => {
    console.log('MAP', map)
    if (map !== null || map === undefined) {
      map.remove()
    }
    map = DG.map('mapContainer', {
      center: [`${lat}`, `${lng}`],
      zoom: 14
    })

    const icon = DG.icon({
      iconUrl: '../assets/images/marker1.png',
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
      /*
      socialObjects = {
        products: {
          name: 'Продукты',
          icon: 'shopMarker',
          list: [{},{},{}]
        }
      }
      */
      Object.keys(socialObjects).forEach((categoryName) => {
        const marker = DG.icon({
          iconUrl: `../assets/images/${socialObjects[categoryName].icon}.png`,
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

    // getAddMarkers(socialObjectsProducts(range), 'shopMarker')
    // getAddMarkers(socialObjectsEducation(range), 'education')
    // getAddMarkers(socialObjectsMedicine(range), 'medicine1')
    // getAddMarkers(socialObjectsSport(range), 'sport1')
    // getAddMarkers(socialObjectsFun(range), 'fun')
  }, [range])

  const uniqueKey = () => (+new Date())
  return (
    <div className="object__block">
      <div className="mapTitle">Социальная инфраструктура</div>
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
      {social.slice(0, 4).map((it, ind) => {
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
                        <div className="object__blockTableTd map">{`${item?.distance}м`}</div>
                        {/* временная строчка для проверки */}
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
  )
}
export default Map
