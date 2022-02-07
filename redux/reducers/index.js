import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import common from './common'
import flat from './flat'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    common,
    flat
  })
}

export default createRootReducer
