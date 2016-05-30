import React from 'react';
import HeaderBar from '../components/HeaderBar'
import RaisedButton from 'material-ui/lib/raised-button'
import store from '../store/configureStore'
import * as ComptesActions from '../actions/comptes'
import { push } from 'react-router-redux'

export default class Aide extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar title="Aide" className="header-bar" />
        <div id="aide-container">
          <h1 className="container-title">Help</h1>
            <div className="box">
              <RaisedButton
                label="Log in"
                primary={true}
                onClick= {() => {
                    store.dispatch(push('/connexion'))
                }}
               />
               <br /><br />
                 <RaisedButton
                   label="Show current user"
                   primary={true}
                   onClick= {() => {
                       store.dispatch(ComptesActions.showCurrentUser())
                   }}
                  />
              <br /><br />
                <RaisedButton
                  label="Log out"
                  primary={true}
                  onClick= {() => {
                      store.dispatch(ComptesActions.logOutAsync( '/' ) )
                  }}
                 />
            </div>
        </div>
      </div>
    );
  }
};
