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
export default class SpalshScreen extends React.Component {
  render() {
    const {actions, loading, connected} = this.props;
    console.log("SpalshScreen ===")
    return (
      <div>
        <Box className="main-container">
          <Box className="main-content" flex="1 0 auto" column="shortcut" justifyContent="center" alignItems="center">
            <Box style={_splashscreenLogoStyle}>
              <img src={require("../../../www/img/logo.png")} alt="My Huissier" />
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}
