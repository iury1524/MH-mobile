import { ADD_CONSTAT, EDIT_CONSTAT, DELETE_CONSTAT } from '../constants/ActionsType'
import { localStorageSetArray, localStorageGetArray, localStorageUpdateArrayItem, localStorageRemoveKey } from '../utils/UtilsLocalStorage'
import { _LS_MES_CONSTATS } from '../constants/config'

const defaultConstat = {
  id: 0,
  titre: "default title",
  description: "default description",
  status: 0, //0: en cours, 1: Complet, 2: non envoyé
  _updated_at: Date.now(),
  _created_at: Date.now(),
  medias: [],
}

let initialState = []
let localStorageConstats  = []
initialState.push(defaultConstat)

if( localStorageGetArray( _LS_MES_CONSTATS ) !== null
    && localStorageGetArray( _LS_MES_CONSTATS ).length > 0 ) {
      localStorageConstats = localStorageGetArray( _LS_MES_CONSTATS )
      initialState = localStorageConstats
}

export default function constats(state = initialState, action) {
  switch (action.type) {
    case ADD_CONSTAT:
      return [
        {
          id: action.newConstat.id,
          titre: action.newConstat.titre,
          description: action.newConstat.description,
          // status: action.newConstat.status, //0: en cours, 1: Complet, 2: non envoyé
          status: action.newConstat.status,
          _updated_at: action.newConstat._updated_at,
          _created_at: action.newConstat._created_at,
          medias: action.newConstat.medias,
        },
        ...state,
      ]
    case DELETE_CONSTAT:
      // let idConstatInt = parseInt(action._idConstat)
      return state.filter(constat =>
        constat.id !== action._idConstat
      )
      // return state
    case EDIT_CONSTAT:
      state.map(constat => {
        if (constat.id === parseInt(action._idConstat)) {
          constat.titre= action.constatStateInLS.titre
          constat.status= action.constatStateInLS.status
          constat.description= action.constatStateInLS.description
          constat._updated_at= action.constatStateInLS._updated_at
          constat.medias= action.constatStateInLS.medias
        }
      })
      return state
    default:
      return state
  }
}
