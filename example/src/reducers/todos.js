import {
  CLIENT_ACTION_FAILURE,
  CLIENT_ACTION_REQUEST,
  CLIENT_ACTION_SUCCESS,
} from 'redux-coreapi'


const defaultState = {
  loading: false,
  error: undefined,
  index: [],
  data: {},
}


function handleClientActionFailure(state, method, { error, params }) {
  if (method === 'list') {
    return handleListFailure(state, error)
  }
  else if (method === 'read') {
    return handleReadFailure(state, Number(params.id), error)
  }

  return state
}


function handleClientActionRequest(state, method, { params }) {
  if (method === 'list') {
    return handleListRequest(state)
  }
  else if (method === 'read') {
    return handleReadRequest(state, Number(params.id))
  }

  return state
}


function handleClientActionSuccess(state, method, payload) {
  if (method in successHandlerMap) {
    return successHandlerMap[method](state, payload)
  }

  return state
}


function handleCreateSuccess(state, { result: instance }) {
  return {
    ...state,
    index: state.index.concat([instance.id]),
    data: {
      ...state.data,
      [instance.id]: {
        loading: false,
        error: undefined,
        instance
      }
    }
  }
}


function handleDeleteSuccess(state, { params }) {
  const id = Number(params.id)

  let index
  const idIndex = state.index.indexOf(id)
  if (idIndex === -1) {
    index = state.index
  }
  else {
    index = state.index.slice(0)
    index.splice(idIndex, 1)
  }

  const data = { ...state.data }
  delete data[id]

  return {
    ...state,
    index,
    data,
  }
}


function handleListFailure(state, error) {
  return {
    ...state,
    loading: false,
    error,
  }
}


function handleListRequest(state) {
  return {
    ...state,
    loading: true,
    error: undefined,
  }
}


function handleListSuccess(state, { result }) {
  return {
    loading: false,
    error: undefined,
    index: result.map(instance => instance.id),
    data: result.reduce((acc, instance) => {
      acc[instance.id] = {
        loading: false,
        error: undefined,
        instance,
      }
      return acc
    }, {})
  }
}


function handleReadFailure(state, id, error) {
  return {
    ...state,
    data: {
      ...state.data,
      [id]: {
        loading: false,
        error,
        instance: undefined,
      }
    }
  }
}


function handleReadRequest(state, id) {
  const instanceData = state.data[id] || {}
  return {
    ...state,
    data: {
      ...state.data,
      [id]: {
        ...instanceData,
        loading: true,
        error: undefined,
      }
    }
  }
}


function handleReadSuccess(state, { result: instance }) {
  const index = state.index.indexOf(instance.id) === -1 ?
    state.index.concat([instance.id]) :
    state.index
  return {
    index,
    data: {
      ...state.data,
      [instance.id]: {
        instance,
        error: undefined,
        loading: false,
      },
    }
  }
}


const handlerMap = {
  [CLIENT_ACTION_FAILURE]: handleClientActionFailure,
  [CLIENT_ACTION_REQUEST]: handleClientActionRequest,
  [CLIENT_ACTION_SUCCESS]: handleClientActionSuccess,
}


const successHandlerMap = {
  create: handleCreateSuccess,
  delete: handleDeleteSuccess,
  list: handleListSuccess,
  partial_update: handleReadSuccess,
  read: handleReadSuccess,
  update: handleReadSuccess,
}


export default function schema(state = defaultState, { payload = {}, type }) {
  const { keys = [] } = payload
  if (type in handlerMap && keys.length === 2 && keys[0] === 'todos') {
    return handlerMap[type](state, keys[1], payload)
  }
  return state
}
