import React from 'react';
import HeaderBar from '../components/HeaderBar'
import EnvoiProgress from '../components/EnvoiProgress'
import RaisedButton from 'material-ui/lib/raised-button'
import IcCancel from 'material-ui/lib/svg-icons/navigation/cancel'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'

export default class Envoi extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar title="Envoi" className="header-bar" />
        <div id="envoi-container">
          <EnvoiProgress />
          <p>Envoi en cours ...</p>
          <RaisedButton
            label="Annuler"
            icon={<IcCancel />}
            onClick={() => store.dispatch(routeActions.push('/ajouter_constat'))}
            primary={true} />
        </div>
      </div>
    );
  }
};
