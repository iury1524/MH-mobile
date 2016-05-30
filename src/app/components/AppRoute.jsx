import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router, Route,IndexRoute, hashHistory, browserHistory, createBrowserHistory } from 'react-router'
import * as reducers from '../reducers'
import store from '../store/configureStore'
import Box from 'react-layout-components'

// PAGES and COMPONENTS
import ConnexionPage from '../pages/Connexion'
import ResetPasswordPage from '../pages/ResetPassword'
import UpdatePasswordPage from '../pages/UpdatePassword'
import InscriptionPage from '../pages/inscription'
import MesConstatsPage from '../pages/MesConstats'
import MesDroitsPage from '../pages/MesDroits'
import MonComptePage from '../pages/MonCompte'
import AidePage from '../pages/Aide'
import AjouterConstatPage from '../pages/AjoutConstat'
import ModifierConstatPage from '../pages/ModificationConstat'
import DetailsConstatPage from '../pages/DetailsConstat'
import PaiementPage from '../pages/Paiement'
import EnvoiPage from '../pages/Envoi'
import SpalshScreen from '../pages/SpalshScreen'
import Footer from '../components/Footer'
import CircularProgress from 'material-ui/lib/circular-progress'
import * as ComptesActions from '../actions/comptes'
import * as SettingsActions from '../actions/settings'
import { bindActionCreators } from 'redux'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createHistory } from 'history';
import { localStorageRemoveKey } from '../utils/UtilsLocalStorage'
import { _LS_PHOTOS_CONSTATS, _LS_MES_CONSTATS, _LS_PREVIEW_DETAIL_CONSTAT } from '../constants/config'


const _mainContainerStyle = {
  height: '100vh',
  width: "100%",
}
const _mainContentStyle = {
  position: 'relative',
}
const _childrenContainerStyle = {
  overflowY: "auto",
}
const _footerStyle = {
  background: "white",
  zIndex: 999,
}

const IndexComponent = ({children}) => {
  const state = store.getState()
  const location = children.props.location.pathname
  // if(location === "/") {
  // }
  return (
    <Box className="main-container" style={_mainContainerStyle}>
      <Box className="main-content" flex="0 1 auto" style={_mainContentStyle} column="shortcut" justifyContent="center" alignItems="center">
        <Box flex="1" style={_childrenContainerStyle}>{children}</Box>
        <Box style={_footerStyle}>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
const synchronizeData = () => {
  console.log('synchronizeData ===')
  store.dispatch(SettingsActions.synchronizeData())
}
const onEnterPaimentPage = () => {
  store.dispatch(ComptesActions.checkUserConnection('/paiement'))
}
const onEnterConnectionPage = () => {
  store.dispatch(ComptesActions.checkUserConnection('/mes_constats'))
}
const onEnterMyAccountPage = () => {
  store.dispatch(ComptesActions.checkUserConnection('/mon_compte'))
}

class AppRoute extends React.Component {
  render() {
    const history = syncHistoryWithStore(hashHistory, store)
    // INIT LOCAL STORAGE
    // let photoIterator=1
    // let constatIterator=1
    // const nbLSConstat = 25
    // const nbLSPhoto = 4
    // for(photoIterator; photoIterator < nbLSPhoto + 1; photoIterator++) {
    //   let addPhotoReducerName = "addPhotoReducer" + photoIterator
    //   localStorageRemoveKey(addPhotoReducerName)
    // }
    // for(constatIterator; constatIterator < nbLSConstat + 1; constatIterator++) {
    //   let addConstatReducerName = "addConstatReducer" + constatIterator
    //   localStorageRemoveKey(addConstatReducerName)
    // }
    // localStorageRemoveKey(_LS_MES_CONSTATS)
    // localStorageRemoveKey(_LS_PHOTOS_CONSTATS)
    // localStorageRemoveKey(_LS_PREVIEW_DETAIL_CONSTAT)

    // localStorageRemoveKey("addConstatReducer4kqj9aLymd")
    // localStorageRemoveKey("addConstatReducer72Akslb3Yt")
    // localStorageRemoveKey("addConstatReducerbiBlXWHitA")
    // localStorageRemoveKey("addConstatReducerlodIIr6WMu")
    // localStorageRemoveKey("addConstatReducerundefined")
    //
    //
    //
    //
    //
    // console.log("AppRoute === ")
    // console.log(window.localStorage)
    // console.log("AppRoute === ")

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={IndexComponent}>
            <IndexRoute component={AidePage} onEnter={synchronizeData}/>
            <Route path="/connexion" component={ConnexionPage}/>
            <Route path="/reset_password" component={ResetPasswordPage}/>
            <Route path="/edit_password" component={UpdatePasswordPage}/>
            <Route path="/inscription" component={InscriptionPage}/>
            <Route path="/ajouter_constat" component={AjouterConstatPage}/>
            <Route path="/modifier_constat" component={ModifierConstatPage}/>
            <Route path="/mes_constats" component={MesConstatsPage}/>
            <Route path="/details_constat" component={DetailsConstatPage}/>
            <Route path="/mon_compte" component={MonComptePage}/>
            <Route path="/mes_droits" component={MesDroitsPage}/>
            <Route path="/aide" component={AidePage}/>
            <Route path="/paiement" component={PaiementPage}/>
            <Route path="/envoi" component={EnvoiPage}/>
          </Route>
        </Router>
      </Provider>,
    );
  }
}

export default AppRoute
