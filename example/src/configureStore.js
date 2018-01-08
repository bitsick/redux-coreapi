import createBrowserHistory from 'history/createBrowserHistory'
import {routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { coreapiMiddleware } from 'redux-coreapi'

import DevTools from './components/DevTools'
import reducers from './reducers'


export const history = createBrowserHistory()


export default function configureStore(preloadedState) {
  const middleware = applyMiddleware(
    coreapiMiddleware,
    routerMiddleware(history)
  )
  const enhancers = compose(middleware, DevTools.instrument())
  return createStore(reducers, preloadedState, enhancers)
}
