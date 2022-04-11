import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from "next/link"

const RandomObjects = () => {
  const [random, setRandom] = useState('')

  const getRandom = async () => {
    const randomMkd = await axios(`/api/randData`)
    setRandom(randomMkd)
  }

  useEffect (() => {
    getRandom()
  }, [])

  console.log('RANDOMMKD', random.data)


  return (
    <div className="randomObjects">
      <div className="content">
        <div className="randomObjectsTitle">Примеры запросов в реестр МКД</div>
        <div className="randomObjectsFlex">
          <Link href="/">
            <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto oneMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
              </div>
            </div>
            </a>
          </Link>
          <Link href="/">
            <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto twoMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
              </div>
            </div>
            </a>
          </Link>
          <Link href="/">
            <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto threeMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
              </div>
            </div>
            </a>
          </Link>
          <Link href="/">
            <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto fourMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
              </div>
            </div>
            </a>
          </Link>
          <Link href="/">
           <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto fiveMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
              </div>
            </div>
            </a>
          </Link>
          <Link href="/">
            <a className="mkdLink">
              <div className="mkdObject">
              <div className="objectPhoto sixMkd" />
              <div className="objectAddress">
                  Отрадный ул. Ленина, 34
              </div>
              <div className="flatCount">
                  100 квартир
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