import { combineReducers } from 'redux'

import schema from './schema'
import todos from './todos'


export default combineReducers({ schema, todos })
