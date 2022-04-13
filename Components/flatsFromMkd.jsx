import React from 'react'

const FlatsFromMkd = ({flatsList}) => {
  const flatList = JSON.parse(flatsList)

  return (
    <div>{flatList?.map((it) => {
      <div>{it.cadnum}</div>
    })}</div>
    // <div>кря</div>
  )
}

export default FlatsFromMkd