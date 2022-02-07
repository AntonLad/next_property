const ASK_FLAT = 'const ASK_FLAT'

const initialState = {
  getAskPrice: {}

}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ASK_FLAT: {
      return {
        ...state,
        getAskPrice: action.payload
      }
    }
    default:
      return state
  }
}

export function setInputFlat(value) {
  return {
    type: ASK_FLAT,
    payload: value
  }
}
