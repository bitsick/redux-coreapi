/**
 * A minimal interface between Redux and Core API.
 */

import { action, get } from './actions'
import coreapiMiddleware from './middleware'
import {
  CLIENT_ACTION,
  CLIENT_ACTION_FAILURE,
  CLIENT_ACTION_REQUEST,
  CLIENT_ACTION_SUCCESS,
  CLIENT_GET,
  CLIENT_GET_FAILURE,
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
} from './types'


export {
  CLIENT_ACTION,
  CLIENT_ACTION_FAILURE,
  CLIENT_ACTION_REQUEST,
  CLIENT_ACTION_SUCCESS,
  CLIENT_GET,
  CLIENT_GET_FAILURE,
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
  action,
  get,
  coreapiMiddleware
}
