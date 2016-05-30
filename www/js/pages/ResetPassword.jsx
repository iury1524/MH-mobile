import React from 'react';
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
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
import LoadingBox from '../components/LoadingBox'

const submitBtnStyle = {
  marginTop: 14,
}
const _loadingStyle = {
  zIndex: 1000,
  position: 'absolute',
  height: '100vh',
  width: '100%',
  backgroundColor: '#fff',
}

//-------------------------------------------------//
//-------------- Begin Form validation  -----------//
//-------------------------------------------------//
const validate = values => {
  const errors = {}
  if (!values.newPassword) {
    errors.newPassword = 'Required'
  }
  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = 'Required'
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Must match the previous entry'
  }
  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

class ResetPassword extends React.Component {
  render() {
    const {fields: {newPassword, confirmNewPassword}, handleSubmit, actions, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      const _passwords = {
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }
      store.dispatch(CompteActions.resetPassword( _passwords, "/mon_compte" ))
    }
    return (
      <div>
        { is_loading ? <LoadingBox /> : <Box></Box> }
        <HeaderBar title="Connexion" className="header-bar" />
        <div id="connexion-container" className="container">
          <h1 className="container-title">Reset Password</h1>
          <div className="form-connexion">
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Type the new password here"
                  type="password"
                  errorText={newPassword.touched && newPassword.error ? newPassword.error : ''}
                   {...newPassword}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Confirm your new password"
                  type="password"
                  errorText={confirmNewPassword.touched && confirmNewPassword.error ? confirmNewPassword.error : ''}
                   {...confirmNewPassword}
                />
              </div>
              <div className="submit-btn" style= {submitBtnStyle}>
                <RaisedButton
                  label="Reset Password"
                  icon={<IcSend />}
                  type="submit"
                  primary={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

ResetPassword = reduxForm ({
  form: 'ResetPassword',
  fields: ['newPassword', 'confirmNewPassword'],
  validate,
})(ResetPassword)

function mapStateToProps(state) {
  const _connectedState = state.myHuissier.connexion
  const _settingState = state.myHuissier.settings
  return {
    connected: _connectedState,
    _settingState: _settingState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CompteActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)
