import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import './index.css'
import App from './containers/App'
import configureStore, { history } from './configureStore'


ReactDOM.render(
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/todos" component={App}/>
        <Redirect from="/" to="/todos" />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
