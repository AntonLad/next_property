import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import Countdown from './countdown'


const Search = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [enterText, setEnterText] = useState('')
  const [cadNumber, setCadNumber] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)

  const loadReesrt = async (subject = '') => {
    const response = await axios.get(`/api/tooltips?text=${subject}`)
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
      const getAskReestrByCudNum = await axios.get(`/api/findobject?cadNumber=${cadNumber || enterText}`)
        .then((result) => {
          if (result.data.error) {
            setLoading(false)
          }
          return result.data
        })
      console.log('getAskReestrByCudNum', getAskReestrByCudNum)
      if (!getAskReestrByCudNum.error) {
        const askObjectId = await axios(`/api/findId?cadNumber=${cadNumber || enterText}`)
        const objectId = askObjectId.data.getAskId

        if (objectId !== 0 || objectId.error) {
          await axios(`/api/findRights?objectid=${objectId}&cadNumber=${cadNumber || enterText}`)
        }
        const address = getAskReestrByCudNum.objectData?.objectAddress?.addressNotes || getAskReestrByCudNum.objectData?.objectAddress?.mergedAddress
        if (address) {
          await axios(`/api/askdadata?cadNumber=${cadNumber || enterText}`)
        }
        router.push(`/object/${cadNumber || enterText}`)
        setLoading(false)
      }
      setData(getAskReestrByCudNum)
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


  return (
    <div>
      <div className="search__wrap">
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="?????????????? ?????????????????????? ?????????? ?????? ??????????"
              value={enterText}
              onChange={onChange}
            />
            <button
            className="searchButton"
              type="button"
              disabled={enterText.length < 10}
              autoComplete="off"
              onClick={() => {
                askReestr()
                setLoading(true)
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
                      <p className="typeOfRealty">??????????????</p>
                    )}
                    {it.type === 'OKS' && (
                      <p className="typeOfRealty">????????????</p>
                    )}
                    {it.type === 'FLAT' && (
                      <p className="typeOfRealty">????????????????</p>
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
      <div className="search__example">????????????:
        <span> ????????????, ???? ??????????????, 30</span>  ??????
        <span
          aria-hidden="true"
          className="a _blueback _inner js__searchExample"
          onClick={() => {
            setEnterText('63:01:0629002:638')
          }}
        >  63:01:0629002:638
        </span>

      </div>
    </div>

  )
}

export default Search
