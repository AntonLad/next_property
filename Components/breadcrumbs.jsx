import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Breadcrumbs = ({ cadastrObj }) => {
  console.log('Breadcrumpsprops', JSON.parse(cadastrObj))
  const router = useRouter()
  const path = router.asPath
  const cadNumber = router.query.cadnumber
  console.log('ROUTER', path)
  console.log('cadNumber', cadNumber)
  const cadObj = JSON.parse(cadastrObj)
  const addressNotes = cadObj?.objectData?.objectAddress?.mergedAddress || cadObj?.address
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
        <span class="__gt">&gt;</span>
        <li>
        <Link href={path} >
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