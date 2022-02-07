import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import ReactLoading from 'react-loading'
// import { useDispatch } from 'react-redux'
// import { setInputCadastrResult, setInputId, setInputRights } from '../redux/reducers/common'
// import { setInputFlat } from '../redux/reducers/flat'

// import { history } from '../redux'

// import Countdown from './countdown'

const Search = () => {
  const [value, setValue] = useState([])
  const [enterText, setEnterText] = useState('')
  const [cadNumber, setCadNumber] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  // const dispatch = useDispatch()

  const loadReesrt = async (subject = '') => {
    const response = await axios.get(`/api/v1/search/${subject}`)
    setValue(response.data)
  }

  const onChange = (e) => {
    setEnterText(() => e.target.value)
    loadReesrt(e.target.value)
  }

  const updateInputText = ({ name, number }) => {
    setEnterText(name)
    setCadNumber(number)
    setValue([])
  }

  const askReestr = async () => {
    if (cadNumber.length > 10 || enterText.length > 10) {
      const getAskReestrByCudNum = await axios(`/api/v1/findObject/${cadNumber || enterText}`)
        .then((result) => {
          setLoading(false)
          return result.data
        })

      dispatch(setInputCadastrResult(getAskReestrByCudNum))
      const askObjectId = await axios(`/api/v1/findId/${cadNumber || enterText}`)
      const objectId = askObjectId.data
      dispatch(setInputId(objectId))

      const getAskRights = await axios(`/api/v1/findRights/${objectId.getAskId}`)
      dispatch(setInputRights(getAskRights.data))
      localStorage.setItem(`${cadNumber || enterText}`, JSON.stringify({ ...getAskReestrByCudNum, getAskRights }))
      setData(getAskReestrByCudNum)
      if (typeof getAskReestrByCudNum.error === 'undefined') {
        history.push(`/object/${cadNumber || enterText}`)
      }
    }
  }

  const clearInput = () => {
    setValue([])
    setEnterText('')
    setData('')
  }

  const clearToolTips = () => {
    setValue([])
    setData('')
  }

  useEffect(() => {
    document.addEventListener('click', clearToolTips)
    return () => document.removeEventListener('click', clearToolTips)
  }, [])

  // useEffect(() => {
  //   if (document.querySelector('.dataItem')) {
  //     console.log(document.querySelector('.dataItem').addEventListener('click'))
  //   }
  //   return () => document.querySelector('.dataItem').addEventListener('click')
  // }, [])

  return (
    <div>
      <div className="search__wrap">
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Введите кадастровый номер или адрес объекта"
              value={enterText}
              onChange={onChange}
            />
            <button
              type="button"
              disabled={enterText.length < 10}
              onClick={() => {
                askReestr()
                setLoading(true)
                dispatch(setInputFlat({}))
              }}
            >
              <div aria-hidden="true" className="searchIcon">
                {value.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </button>

          </div>
          {value.length !== 0 && (
            <div className="dataResult">
              {value.map((it, index) => {
                const uniqueKey = +new Date()
                return (
                  <div
                    className="dataItem"
                    aria-hidden="true"
                    onClick={() => updateInputText({ name: it.full_name, number: it.cadnum })}
                    key={`${index + uniqueKey}`}
                  >
                    <p className="adress">{it.full_name}</p>
                    <p className="cadnum">{it.cadnum}</p>
                    {it.type === 'PARCEL' && (
                      <p className="typeOfRealty">участок</p>
                    )}
                    {it.type === 'OKS' && (
                      <p className="typeOfRealty">здание</p>
                    )}
                    {it.type === 'FLAT' && (
                      <p className="typeOfRealty">квартира</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          {data.error && (
            <div className="dataErrorResult">
              <div className="response">
                {data.error}
              </div>
            </div>
          )}
          {loading && (
          <div className="spinnerContainer">
            <div className="spinner">
              <ReactLoading type="spinningBubbles" color="white" height={50} width={50} />
              <span>
                <Countdown />
              </span>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="search__example">Пример:
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
            setEnterText('63:01:0629002:000')
          }}
        >  63:01:0629002:000
        </span> или
        <span
          aria-hidden="true"
          className="a _blueback _inner js__searchExample"
          onClick={() => {
            setEnterText('16:39:012701:131')
          }}
        >  16:39:012701:131
        </span>

      </div>
    </div>

  )
}

export default Search
