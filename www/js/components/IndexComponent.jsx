import React from 'react';
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
import CircularProgress from 'material-ui/lib/circular-progress'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcSend from 'material-ui/lib/svg-icons/content/send'
import { Link, hashHistory } from 'react-router'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import FacebookLogin from 'react-facebook-login';
import {rechercherUser, connexionUserFB} from '../actions/comptes'
import { connect } from 'react-redux'
import * as CompteActions from '../actions/comptes'
import * as SettingsActions from '../actions/settings'
import { bindActionCreators } from 'redux'
import Box from 'react-layout-components'

const _mainContainerStyle = {
  // minHeight: 650,
}
const _splashscreenLogoStyle = {
  marginTop: 24,
}
const _loadingStyle = {
  marginTop: 64,
  marginBottom: 14,
}
class IndexComponent extends React.Component {
  render() {
    const {children, settings, comptesActions} = this.props;
    const is_loading = settings.isLoading

    // GESTION DU SPLASHSCREEN
    if(location === "/") {
      console.log("IndexComponent ===")
      // Afficher splashScreen pendant
      store.dispatch(SettingsActions.startLoading())
      setTimeout(function(){
        // start loading
        //checklogin .then stoploading
        // store.dispatch(comptesActions.checkLoginAsync())
        store.dispatch(push("/mes_constats"))

      }, 5000);
      store.dispatch(SettingsActions.stopLoading())


      return (
        <Box className="main-container" style={_mainContainerStyle}>
          <Box className="main-content" flex="1 0 auto" column="shortcut" justifyContent="center" alignItems="center">
            <Box style={_splashscreenLogoStyle}>
              <img src={require("../../../www/img/logo.png")} alt="My Huissier" />
            </Box>
            {is_loading ?
              <Box style={_loadingStyle} justifyContent="flex-end" alignItems="flex-end">
                <CircularProgress />
              </Box>
              : <div></div>}
          </Box>
        </Box>
      )
    }
    return (
      <Box className="main-container">
        <Box className="main-content">
          {is_loading ?
            <Box style={_loadingStyle} justifyContent="flex-end" alignItems="flex-end">
              <CircularProgress />
            </Box>
            : <div>{children}</div>}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  let _settingsState = state.myHuissier.settings
  return {
    settings: _settingsState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    comptesActions: bindActionCreators(CompteActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(IndexComponent)
