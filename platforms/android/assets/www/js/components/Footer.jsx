import React from 'react'
import ReactDOM from 'react-dom'
import { routeActions } from 'react-router-redux'
import FlatButton from 'material-ui/lib/flat-button'
import store from '../store/configureStore'
import { push } from 'react-router-redux'

export default class Footer extends React.Component {
  render() {
    return (
      <div id="footer" className="grid-4" >
        <div className="box">
            <FlatButton
              className="btn-footer"
              label="Account"
              onClick={() => store.dispatch(push('/mon_compte'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Findings"
              className="btn-footer"
              onClick={() => store.dispatch(push('/mes_constats'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Rights"
              className="btn-footer"
              onClick={() => store.dispatch(push('/mes_droits'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Help"
              className="btn-footer"
              onClick={() => store.dispatch(push('/aide'))}
            />
        </div>
      </div>
    );
  }
}
