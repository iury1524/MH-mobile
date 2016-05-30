import Parse from 'parse'
import ParseReact from 'parse-react'
import thunk from 'redux-thunk'
import { SIGNUP_USER, SET_LOADING_STATE, CONNECT_USER, LOG_OUT_USER, UPDATE_PROFIL_STATE } from '../constants/ActionsType'
import {_PARSE_APP_ID, _PARSE_SERVER_URL} from '../constants/config'
import * as UtilsParse from '../utils/UtilsParse'
import * as SettingsActions from '../actions/settings'
import store from '../store/configureStore'
import { push } from 'react-router-redux'

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

export function updateProfilState(_userInfos) {
    return {
      type: UPDATE_PROFIL_STATE,
      _user: _userInfos,
    }
}

export function showCurrentUser() {
  Parse.initialize(_PARSE_APP_ID)
  Parse.serverURL = _PARSE_SERVER_URL
  const _currentUser = Parse.User.current()
  console.log('showCurrentUser ===')
  console.log(_currentUser)
  console.log('showCurrentUser ===')
  return {
    type: 'null',
  }
}

export function resetPassword( newPassword, nextPush ) {
  return dispatch => {
    store.dispatch( startLoading() )
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    const _currentUser = Parse.User.current()
    const _username = _currentUser.get("username")
    // //check if password is correct and update user info if checked
    _currentUser.set('password', newPassword)
    return _currentUser.save().then( (user) => {
      console.log('Password changed')
      //updating user accountState
      store.dispatch( SettingsActions.synchronizeData() )
      store.dispatch( stopLoading() )
      store.dispatch( push(nextPush) )
    })
  }
}

export function editPassword( _passwords, nextPush ) {
  return dispatch => {
    store.dispatch( startLoading() )
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    const _currentUser = Parse.User.current()
    const _username = _currentUser.get("username")
    // //check if password is correct and update user info if checked
    Parse.Cloud.run('checkUserPassword', { password: _passwords.password, username: _username }).then( function(passwordChecked) {
        if(passwordChecked) {
            console.log("password checked!")
            // update user informations
            _currentUser.set('password', _passwords.newPassword)
            return _currentUser.save().then( (user) => {
              return user.fetch();
            }).then( (user) => {
            console.log('Password changed', error)
            //updating user accountState
            store.dispatch( SettingsActions.synchronizeData() )
            store.dispatch( stopLoading() )
            store.dispatch( push(nextPush) )
          },
          function(error) {
            console.log('Something went wrong', error);
            store.dispatch( stopLoading() )
          }
        )
      }
      else {
        console.log("Password not checked!")
        store.dispatch( stopLoading() )
      }
    })
  }
}

export function updateProfil( _newUserInfos, nextPush ) {
  return dispatch => {
    store.dispatch( startLoading() )
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    //getting current user
    const _currentUser = Parse.User.current()
    const _username = _currentUser.get("username")
    //check if password is correct and update user info if checked
    Parse.Cloud.run('checkUserPassword', { password: _newUserInfos.password, username: _username }).then( function(passwordChecked) {
      if(passwordChecked) {
        console.log("Password checked!")
        // update user informations
        _currentUser.set('email', _newUserInfos.mail)
        _currentUser.set('username', _newUserInfos.mail)
        _currentUser.set('nom', _newUserInfos.nom)
        _currentUser.set('prenom', _newUserInfos.prenom)
        return _currentUser.save().then( () => {
          //updating user accountState
          store.dispatch( SettingsActions.synchronizeData() )
          store.dispatch( stopLoading() )
          store.dispatch( push(nextPush) )
        })
      }
      else {
        console.log("Password not checked!")
        store.dispatch( stopLoading() )
      }
    })
  }
}

export function loginWithMail( _user, nextPush ) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    dispatch(startLoading())
    Parse.User.logIn(_user.mail , _user.password).then(function(user) {
      let query = new Parse.Query(Parse.User);
      query.ascending('username');
      query.equalTo("username", _user.mail)
      query.find().then( user => {
        return Parse.User.current().fetch().then(currentUser => {
          const userInfo = {
            id : currentUser.id,
            email : currentUser.get("username"),
            nom : currentUser.get("nom"),
            prenom : currentUser.get("prenom"),
          }
          dispatch(updateProfilState( userInfo ))
          dispatch(stopLoading())
          store.dispatch(push(nextPush))
        })
      }, error => {
        console.log(error);
        dispatch(stopLoading())
      });
    }, function (error) {
        console.log("connexion failed ===")
    })
  }
}

export function logOutAsync( _nextPush ) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    dispatch(startLoading())
    Parse.User.logOut().then(() => {
      console.log(" Current user after logout ==== ")
      console.log(Parse.User.current())
      console.log(" Current user after logout ==== ")
      dispatch(updateProfilState( {} ))
      dispatch(stopLoading())
      store.dispatch(push( _nextPush ))
    })
  }
}

export function signUp(_user, nextPush) {
    return dispatch => {
      Parse.initialize(_PARSE_APP_ID)
      Parse.serverURL = _PARSE_SERVER_URL
      dispatch(startLoading())
      let user = new Parse.User();
      user.set("username", _user.mail)
      user.set("email", _user.email )
      user.set("nom", _user.lastname )
      user.set("prenom", _user.firstname )
      user.set("password", _user.password )
      user.set("type", "0" ) // 1 if huissier, 0 if client
      user.signUp(null, {
        success: function(user) {
          console.log("Sign up success")
          return {
            type: SIGNUP_USER ,
            user : _user ,
            sending: Date.now(),
          }
        },
        error: function(user, error) {
          console.log("Erreur: " + error.message)
        },
      }).then(() => {
        console.log(" end of signup  ==== ")
        dispatch(stopLoading())
      })
    }
}

export function checkUserConnection( _nextPush ) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_ID)
    Parse.serverURL = _PARSE_SERVER_URL
    dispatch(startLoading())
    const _currentUser = Parse.User.current()
    if(_currentUser !== null) {
      return Parse.User.current().fetch().then ( (currentUser) => {
        console.log("currentUser")
        console.log(currentUser)
        console.log("currentUser")
        if( currentUser !== null ) {
          dispatch(stopLoading())
          store.dispatch(push( _nextPush ))
        }
      })
    }
    else {
      store.dispatch(push( '/connexion' ))
    }
    dispatch(stopLoading())
  }
}
