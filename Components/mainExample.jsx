import React from 'react'
import Search from './search'

const MainExample = () => {
  const object = '16:39:012701:131'
  return (
    <div className="search__example_main">Пример:
      <span
        aria-hidden="true"
        className="a _blueback _inner js__searchExample"
      >
        Самара, ул Дыбенко, 30
      </span>  или
      <span
        aria-hidden="true"
        className="a _blueback _inner js__searchExample"
        onClick={() => {
          setEnterText('63:01:0629002:638')
        }}
      >  63:01:0629002:638
      </span> или
      <span
        aria-hidden="true"
        className="a _blueback _inner js__searchExample"
        onClick={() => {
          setEnterText('63:06:0303003:1365')
        }}
      >  63:06:0303003:1365
      </span> или
      <span
        aria-hidden="true"
        className="a _blueback _inner js__searchExample"
        onClick={() => {
          <Search text={object}/>
        }}
      >  16:39:012701:131
      </span>
   </div>
  )
}

export default MainExample