import React from 'react';
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcSend from 'material-ui/lib/svg-icons/content/send'
import IcExit from 'material-ui/lib/svg-icons/action/exit-to-app'
import * as CompteActions from '../actions/comptes'

import { insertClient }   from '../actions/comptes'
import store from '../store/configureStore'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Box from 'react-layout-components'
import LoadingBox from '../components/LoadingBox'
import { Link, hashHistory } from 'react-router'

const submitBtnStyle = {
  marginTop: 14,
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
  if (!values.prenom) {
    errors.prenom = 'Required'
  }
  if (!values.nom) {
  errors.nom = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

class MonCompte extends React.Component {
  render() {
    const {fields: {prenom, nom, email, password}, handleSubmit, actions, accountState, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      const _user = {
        mail: values.email,
        nom: values.nom,
        prenom: values.prenom,
        password: values.password,
      }
      store.dispatch(CompteActions.updateProfil( _user, "/mes_constats" ))
    }
    return (
      <div>
        <HeaderBar title="Mon Compte" className="header-bar" />
        { is_loading ? <LoadingBox /> : <Box></Box> }
        <div id="mon-compte-container" className="container">
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <TextField
                hintText=""
                floatingLabelText="E-mail"
                value= {accountState.email}
                errorText={email.touched && email.error ? email.error : ''}
                 {...email}
              />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Firstname"
                value= {accountState.prenom}
                errorText={prenom.touched && prenom.error ? prenom.error : ''}
                 {...prenom}
              />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Lastname"
                value= {accountState.nom}
                errorText={nom.touched && nom.error ? nom.error : ''}
                 {...nom}
              />
            </div>
            <div>
              <TextField
                type="password"
                hintText=""
                floatingLabelText="Type your current password here"
                value= ""
                errorText={password.touched && password.error ? password.error : ''}
                 {...password}
              />
            </div>
            <div className="submit-btn" style= {submitBtnStyle}>
              <RaisedButton
                label="Save"
                icon={<IcSend />}
                type="submit"
                primary={true} />
            </div>
          </form>
          <div>
          <br/>
          <div className="util-link">
            <Link to="/edit_password">Edit password</Link> <br /><br />
            <Link to="/reset_password">Reset password</Link>
          </div>
          <br/><br/>
            <RaisedButton
              label="Log Out"
              icon={<IcExit />}
              onClick= {() => {
                  store.dispatch(CompteActions.logOutAsync("/mes_constats"))
              }}
              />
            </div>
        </div>
      </div>
    )
  }
}

MonCompte = reduxForm ({
  form: 'monCompte',
  fields: ['prenom', 'nom', 'email','password'],
  validate,
})(MonCompte);

function mapStateToProps(state) {
  const _connexionState = state.myHuissier.comptes.userInfo
  const _settingState = state.myHuissier.settings
  return {
    accountState: _connexionState,
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
)(MonCompte)
