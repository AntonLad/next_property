import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from "next/link"

const RandomMkdObjects = () => {
  const [random, setRandom] = useState([])

  useEffect (async () => {
    const randomMkd = await axios(`/api/randData`)
    setRandom(randomMkd)
  }, [])

  const oneMkd = random?.data?.[0]
  const twoMkd = random?.data?.[1]
  const threeMkd = random?.data?.[2]
  const fourMkd = random?.data?.[3]
  const fiveMkd = random?.data?.[4]
  const sixMkd = random?.data?.[5]

  return (
    <div className="randomObjects1">
      <div className="contentWrap">
        <div className="randomObjectsTitle1">Недавно запрашиваемые объекты</div>
        <div className="object__blockTable _first">
            <a href={`/mkd/${oneMkd?.region_id}-mkd-${oneMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="blockTableTd">{oneMkd?.address}</div>
              </div>
            </a>
          {/* <Link href={`/mkd/${twoMkd?.region_id}-mkd-${twoMkd?.houseguid}`}> */}
            <a href={`/mkd/${twoMkd?.region_id}-mkd-${twoMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="blockTableTd">{twoMkd?.address}</div>
              </div>
            </a>
          {/* </Link> */}
          {/* <Link href={`/mkd/${threeMkd?.region_id}-mkd-${threeMkd?.houseguid}`}> */}
            <a href={`/mkd/${threeMkd?.region_id}-mkd-${threeMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="blockTableTd">{threeMkd?.address}</div>
              </div>
            </a>
          {/* </Link> */}
          {/* <Link href={`/mkd/${fourMkd?.region_id}-mkd-${fourMkd?.houseguid}`}> */}
            <a href={`/mkd/${fourMkd?.region_id}-mkd-${fourMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="blockTableTd">{fourMkd?.address}</div>
              </div>
            </a>
          {/* </Link> */}
          {/* <Link href={`/mkd/${fiveMkd?.region_id}-mkd-${fiveMkd?.houseguid}`}> */}
            <a href={`/mkd/${fiveMkd?.region_id}-mkd-${fiveMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="blockTableTd">{fiveMkd?.address}</div>
              </div>
            </a>
          {/* </Link> */}
          {/* <Link href={`/mkd/${sixMkd?.region_id}-mkd-${sixMkd?.houseguid}`}> */}
            {sixMkd && (
              <a href={`/mkd/${sixMkd?.region_id}-mkd-${sixMkd?.houseguid}`} className="mkdLink1">
              <div className="blockTableTr">
                <div className="object__blockTableTd">{sixMkd?.address}</div>
              </div>
            </a>
            )}

          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default RandomMkdObjects