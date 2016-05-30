import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { routerReducer, routeActions, routerMiddleware } from 'react-router-redux'
import mainReducer from '../reducers'
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from 'redux-thunk'

const reducersToCombine = {
  routing: routerReducer,
  myHuissier: mainReducer,
  form: formReducer,
}
  // START CONFIGURE STORE
  const reducer = combineReducers(reducersToCombine)
  const reduxRouterMiddleware = routerMiddleware(hashHistory)

  const createStoreWithMiddleware = compose (
    applyMiddleware(reduxRouterMiddleware),
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreWithMiddleware(reducer)
  // reduxRouterMiddleware.listenForReplays(store)

  export default store;
