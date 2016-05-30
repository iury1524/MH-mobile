import { CONNECT_USER, LOG_OUT_USER, SIGNUP_USER, UPDATE_PROFIL_STATE } from '../constants/ActionsType'
import { localStorageSetArray, localStorageGetArray, localStorageUpdateArrayItem } from '../utils/UtilsLocalStorage'
import { _LS_PHOTOS_CONSTATS } from '../constants/config'

const _intiState = {
  isConnected: false,
  userInfo: {},
}
// let initialState = []
// initialState.push(_intiState)

export default function photos(state = _intiState, action) {
  switch (action.type) {
    case CONNECT_USER:
      state.isConnected = true
      state.userInfo = action._user
      return state
    case LOG_OUT_USER:
      state.isConnected = false
      state.userInfo = {}
      return state
    case SIGNUP_USER:
      return state
    case UPDATE_PROFIL_STATE:
      state.isConnected = true
      state.userInfo = action._user
      return state
    default:
      return state
  }
}
