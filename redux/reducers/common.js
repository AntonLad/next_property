const ASK_REESTR_BY_CADNUM = 'ASK_REESTR_BY_CADNUM'
const ASK_RIGHTS = 'ASK_RIGHTS'
const ASK_ID = 'ASK_ID'
const ASK_FLAT = 'const ASK_FLAT'

const initialState = {
  getAskReestrByCudNum: {},
  getAskRights: {},
  getAskId: {},
  getAskPrice: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ASK_REESTR_BY_CADNUM: {
      return {
        ...state,
        getAskReestrByCudNum: action.payload
      }
    }
    case ASK_RIGHTS: {
      return {
        ...state,
        getAskRights: action.payload
      }
    }
    case ASK_ID: {
      return {
        ...state,
        getAskId: action.payload.getAskId
      }
    }
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

export const setInputCadastrResult = (value) => async dispatch => {
  console.log('VALUE', value)
  dispatch ({
    type: ASK_REESTR_BY_CADNUM,
    payload: value
  })
}

export function setInputRights(value) {
  return {
    type: ASK_RIGHTS,
    payload: value
  }
}

export function setInputId(value) {
  return {
    type: ASK_ID,
    payload: value
  }
}

export function setInputFlat(value) {
  return {
    type: ASK_FLAT,
    payload: value
  }
}
