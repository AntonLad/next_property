import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from "next/link"

const RandomObjects = () => {
  const [random, setRandom] = useState([])

  useEffect (async () => {
    const randomMkd = await axios(`/api/randData`)
    setRandom(randomMkd)
  }, [])


  console.log('RANDOMMKD', random.data)
  const oneMkd = random?.data?.[0]
  const twoMkd = random?.data?.[1]
  const threeMkd = random?.data?.[2]
  const fourMkd = random?.data?.[3]
  const fiveMkd = random?.data?.[4]
  const sixMkd = random?.data?.[5]
  console.log('ONE', oneMkd)


  return (
    <div className="randomObjects">
      <div className="content">
        <div className="randomObjectsTitle">Примеры запросов в реестр МКД</div>
        <div className="randomObjectsFlex">
          <Link href={`https:mkdfond.ru/mkd/${oneMkd?.region_id}-mkd-${oneMkd?.houseguid}`}>
            <a className="mkdLink">
              <div className="mkdObject">
                <div className="objectPhoto oneMkd" />
                <div className="objectAddress">
                  <p className=''>{oneMkd?.address}</p>
                  <p className="objectButton">Посмотреть объект</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`/mkd/${twoMkd?.region_id}-mkd-${twoMkd?.houseguid}`}>
            <a className="mkdLink">
              <div className="mkdObject">
                <div className="objectPhoto twoMkd" />
                <div className="objectAddress">
                  <p className=''>{twoMkd?.address}</p>
                  <p className="objectButton">Посмотреть объект</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`/mkd/${threeMkd?.region_id}-mkd-${threeMkd?.houseguid}`}>
            <a className="mkdLink">
              <div className="mkdObject">
                <div className="objectPhoto threeMkd" />
                <div className="objectAddress">
                  <p>{threeMkd?.address}</p>
                  <p className="objectButton">Посмотреть объект</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`/mkd/${fourMkd?.region_id}-mkd-${fourMkd?.houseguid}`}>
            <a className="mkdLink">
              <div className="mkdObject">
                <div className="objectPhoto fourMkd" />
                <div className="objectAddress">
                  <p className=''>{fourMkd?.address}</p>
                  <p className="objectButton">Посмотреть объект</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`/mkd/${fiveMkd?.region_id}-mkd-${fiveMkd?.houseguid}`}>
           <a className="mkdLink">
            <div className="mkdObject">
              <div className="objectPhoto fiveMkd" />
              <div className="objectAddress">
                <p className=''>{fiveMkd?.address}</p>
                <p className="objectButton">Посмотреть объект</p>
              </div>
            </div>
            </a>
          </Link>
          <Link href={`/mkd/${sixMkd?.region_id}-mkd-${sixMkd?.houseguid}`}>
            <a className="mkdLink">
              <div className="mkdObject">
                <div className="objectPhoto sixMkd" />
                <div className="objectAddress">
                  <p className=''>{sixMkd?.address}</p>
                  <p className="objectButton">Посмотреть объект</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RandomObjects