import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import ActionAdd from 'material-ui/lib/svg-icons/content/add'
import store from '../store/configureStore'
import { goBack, push } from 'react-router-redux'

export default class HeaderDetailsPage extends React.Component {
  render() {
    return (
        <div>
          <AppBar
            title={<img src={require("../../../www/img/logo.png")} alt="My Huissier" />}
            className="header-detail"
            iconElementLeft={
              <IconButton
                onClick={() => store.dispatch(goBack())}>
                <ArrowBack />
              </IconButton>
            }
            iconElementRight={
              <FlatButton
                label="Add new finding"
                onClick={() => store.dispatch(push('/ajouter_constat'))}
                icon={<ActionAdd />}
                primary={true}
              />
            }
          />
        </div>
    );
  }
}
