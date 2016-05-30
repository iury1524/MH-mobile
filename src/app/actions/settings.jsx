import Parse from 'parse'
import ParseReact from 'parse-react'
import thunk from 'redux-thunk'
import { SET_LOADING_STATE } from '../constants/ActionsType'
import store from '../store/configureStore'
import { push } from 'react-router-redux'
import {_PARSE_APP_ID, _PARSE_SERVER_URL} from '../constants/config'
import * as ComptesActions from './comptes'

export function startLoading() {
    return {
      type: SET_LOADING_STATE,
      _loading: true,
    }
}

export function stopLoading() {
    return {
      type: SET_LOADING_STATE,
      _loading: false,
    }
}

export function synchronizeData() {
    return dispatch => {
      dispatch(startLoading())
      Parse.initialize(_PARSE_APP_ID)
      Parse.serverURL = _PARSE_SERVER_URL
      // user informations
      const _currentUser = Parse.User.current()
      if(_currentUser !== null) {
        // console.log("synchronizeData")
        // console.log(_currentUser)
        // console.log("synchronizeData")
        const userInfo = {
          id : _currentUser.id,
          email : _currentUser.get("username"),
          nom : _currentUser.get("nom"),
          prenom : _currentUser.get("prenom"),
        }
        store.dispatch(ComptesActions.updateProfilState(userInfo))
      }
      //findings state
          // merge online findings and localFinding
      dispatch(stopLoading())
    }
}
