import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ActionAdd from 'material-ui/lib/svg-icons/content/add'
import store from '../store/configureStore'
import { push } from 'react-router-redux'

export default class HeaderBar extends React.Component {
  render() {
    return (
        <div>
          <AppBar
            title={<img src={require("../../../www/img/logo.png")} alt="My Huissier" />}
            iconElementLeft={null}
            className="header"
            iconElementRight={
              <FlatButton
                label="Add new finding"
                onClick={() => store.dispatch(push('/ajouter_constat'))}
                icon={<ActionAdd />}
                primary={true}
              />
            }
            showMenuIconButton = {false}
          />
        </div>
    );
  }
}
