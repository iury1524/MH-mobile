import React from 'react'
import { Link, hashHistory } from 'react-router'
import Paper from 'material-ui/lib/paper'
import store from '../store/configureStore'
import { push } from 'react-router-redux'
import { _LS_PREVIEW_DETAIL_CONSTAT } from '../constants/config'
import { _LS_MES_CONSTATS } from '../constants/config'
import { localStorageGetArray } from '../utils/UtilsLocalStorage'

let img_url = require("../../../www/img/constats-thumbnails/constat_3.jpg")

export default class ConstatsListe extends React.Component {
  render() {
    const { constatsData }  = this.props
    return (
      <div className="liste-constat-grid">
      </div>
    );
  }
}
