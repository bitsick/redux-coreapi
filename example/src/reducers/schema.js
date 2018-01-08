import {
  CLIENT_GET_FAILURE,
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS
} from 'redux-coreapi'


function handleClientGetFailure(state, { error }) {
  return {
    ...state,
    error,
    loading: false,
  }
}


function handleClientGetRequest(state) {
  return {
    ...state,
    loading: true,
  }
}


function handleClientGetSuccess(state, { document: schema }) {
  return {
    ...state,
    schema,
    error: undefined,
    loading: false,
  }
}


const handlerMap = {
  [CLIENT_GET_FAILURE]: handleClientGetFailure,
  [CLIENT_GET_REQUEST]: handleClientGetRequest,
  [CLIENT_GET_SUCCESS]: handleClientGetSuccess,
}


export default function document(state = {}, action) {
  if (action.type in handlerMap) {
    return handlerMap[action.type](state, action.payload)
  }
  return state
}
