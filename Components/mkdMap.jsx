import React, { useState } from 'react'
import { YMaps, Map, TypeSelector, ZoomControl, Placemark, Circle, Clusterer} from 'react-yandex-maps';


const MkdMap = ({mkd}) => {
  console.log('MAPPROPS', JSON.parse(mkd))
  const lat = JSON.parse(mkd).lat
  const lng = JSON.parse(mkd).lon
  return (
    <>
      <div className="object__block">
        <YMaps
          options={{
            mapAutoFocus: true,
            autoFitToViewport: 'always'
          }}
        >
          <div className="mapContainer">
            <Map defaultState={{ center: [lat, lng], zoom: 17 }}
              width="100%"
              height="400px"
              >
              <TypeSelector options={{ float: 'right' }} />
              <ZoomControl options={{ float: 'right' }} />
              {/* <FullscreenControl /> */}
              <Placemark
                geometry={[lat, lng]}
                options={{
                  preset: 'islands#blueHomeIcon',
                  iconColor: '#00000'
                }}
              />
            </Map>
          </div>
        </YMaps>
      </div>
    </>
  )
}
export default MkdMap

