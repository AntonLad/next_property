import React, { useEffect } from 'react'
import DG from '2gis-maps'
// import foto from '../.next/static/media/marker1.png'

let map
const NoFlatMap = ({ cadastrObj }) => {
  const lat = cadastrObj.price?.bld?.pos?.lat
  const lng = cadastrObj.price?.bld?.pos?.lng

  // useEffect(() => {
  //   map = DG.map('mapContainer', {
  //     center: [`${lat}`, `${lng}`],
  //     zoom: 14
  //   })
  // }, [])
  useEffect(() => {
    // if (map !== null || map === undefined) {
    //   map.remove()
    // }
    map = DG.map('mapContainer', {
      center: [`${lat}`, `${lng}`],
      zoom: 14
    })

    const icon = DG.icon({
      iconUrl: '/images/marker1.png',
      iconSize: [21, 32]
    })
    DG.marker([`${lat}`, `${lng}`], { icon }).addTo(map).bindPopup(`${address}`)

  }, [])

   return (
    <div className="object__block">
      <div id="infrastructura" className="object__block-title _map">Социальная инфраструктура</div>
      <div id="mapContainer" className="mapContainer" />
    </div>
  )
}
export default NoFlatMap
