import { combineReducers } from 'redux'
import constats from './constats'
import photos from './photos'
import comptes from './comptes'
import settings from './settings'

const mainReducer = combineReducers({
  photos,
  constats,
  comptes,
  settings,
})

export default mainReducer
