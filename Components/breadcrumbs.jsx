import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Breadcrumbs = ({ cadastrObj }) => {
  const router = useRouter()
  const path = router?.asPath
  const path2 = router?.query

  const cadObj = JSON.parse(cadastrObj)
  const addressNotes = cadObj?.objectData?.objectAddress?.mergedAddress || cadObj?.address || path2?.jkh
  return (
    <div className="object__breadcrumbs">
      <ol className="breadcrumbs">
        <li>
          <Link href="/" >
            <a className="a _blue __a">
              <span>Главная</span>
            </a>
          </Link>
        </li>
        <span className="__gt">&gt;</span>
        <li>
        <Link href={path || path2} >
          <a className="a _blue __this">
            <span>{addressNotes}</span>
          </a>
        </Link>
        </li>
      </ol>
    </div>
  )
}

export default Breadcrumbs