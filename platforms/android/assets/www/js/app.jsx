// STYLE
import '../../scss/base.scss';
import '../../scss/card.scss';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route,IndexRoute, browserHistory, createBrowserHistory } from 'react-router'
import * as reducers from './reducers'
import { Link, hashHistory } from 'react-router'
import store from './store/configureStore'

// PAGES and COMPONENTS
import ConnexionPage from './pages/Connexion'
import InscriptionPage from './pages/inscription'
import MesConstatsPage from './pages/MesConstats'
import MesDroitsPage from './pages/MesDroits'
import MonComptePage from './pages/MonCompte'
import AidePage from './pages/Aide'
import AjouterConstatPage from './pages/AjoutConstat'
import DetailsConstatPage from './pages/DetailsConstat'
import PaiementPage from './pages/Paiement'
import EnvoiPage from './pages/Envoi'
import Footer from './components/Footer'
import AppRoute from './components/AppRoute'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('reactEntryPoint')
)
