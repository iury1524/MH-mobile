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
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

const responseFacebook = (response) => {

}
class Connexion extends React.Component {
  render() {
    const {fields: {password, email}, handleSubmit, actions, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      const _user = {
        mail:values.email,
        password: values.password,
      }
      store.dispatch(CompteActions.loginWithMail( _user, "/mes_constats" ))
    }
    return (
      <div>
        { is_loading ? <LoadingBox /> : <Box></Box> }
        <HeaderBar title="Connexion" className="header-bar" />
        <div id="connexion-container" className="container">
          <h1 className="container-title">Connexion</h1>
          <div className="form-connexion">
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="E-mail"
                  errorText={email.touched && email.error ? email.error : ''}
                   {...email}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Password"
                  type="password"
                  errorText={password.touched && password.error ? password.error : ''}
                   {...password}
                />
              </div>
              <div className="submit-btn" style= {submitBtnStyle}>
                <RaisedButton
                  label="Log In"
                  icon={<IcSend />}
                  type="submit"
                  primary={true} />
              </div>
            </form>
          </div>
          <div className="util-link">
            <Link to="/reset_password">Reset password</Link> <br />
            <Link to="/inscription">Sign Up</Link>
          </div>
          <div className="btn-facebook-login-container">
            <RaisedButton
              label="Log In with Facebook"
              type="submit"
              onClick = {responseFacebook}
            />
          </div>
        </div>
      </div>
    );
  }
};

Connexion = reduxForm ({
  form: 'connexion',
  fields: ['password', 'email'],
  validate,
})(Connexion)

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
)(Connexion)
