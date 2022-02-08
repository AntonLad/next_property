import { combineReducers } from 'redux'
import common from './common'
import flat from './flat'

const createRootReducer = () => {
  return combineReducers({
    common,
    flat
  })
}

export default createRootReducer


