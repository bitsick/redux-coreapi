import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../src/actions'
import middleware from '../src/middleware'
import {
  CLIENT_ACTION_FAILURE,
  CLIENT_ACTION_REQUEST,
  CLIENT_ACTION_SUCCESS,
  CLIENT_GET_FAILURE,
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS,
} from '../src/types'
import {
  client, requestErrorClient, responseErrorClient, document
} from './mocks'


let store
const mockStore = configureStore([thunk, middleware])
beforeEach(() => store = mockStore())


describe('action', () => {
  const keys = ['objects', 'list']
  const params = {}

  test('dispatches CLIENT_ACTION_REQUEST', () => {
    const action = actions.action(client, document, keys, params)
    const promise = store.dispatch(action)

    const storeActions = store.getActions()
    expect(storeActions.length).toBe(1)

    const request = storeActions[0]
    expect(request).toHaveProperty('type', CLIENT_ACTION_REQUEST)
    expect(request).toHaveProperty('payload.client', client)
    expect(request).toHaveProperty('payload.document', document)
    expect(request).toHaveProperty('payload.keys', keys)
    expect(request).toHaveProperty('payload.params', params)

    return promise
  })

  test('dispatches CLIENT_ACTION_SUCCESS for normal response', () => {
    const action = actions.action(client, document, keys, params)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_ACTION_SUCCESS)
        expect(result).toHaveProperty('payload.client', client)
        expect(result).toHaveProperty('payload.document', document)
        expect(result).toHaveProperty('payload.keys', keys)
        expect(result).toHaveProperty('payload.params', params)
        expect(result).toHaveProperty('payload.result', true)
      }
    )
  })

  test('dispatches CLIENT_ACTION_FAILURE for error request', () => {
    const action = actions.action(requestErrorClient, document, keys, params)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
        expect(result).toHaveProperty('payload.client', requestErrorClient)
        expect(result).toHaveProperty('payload.document', document)
        expect(result).toHaveProperty('payload.keys', keys)
        expect(result).toHaveProperty('payload.params', params)
        expect(result).toHaveProperty('payload.error')
        expect(result.payload.error).toBeInstanceOf(Error)
      }
    )
  })

  test('dispatches CLIENT_ACTION_FAILURE for error response', () => {
    const action = actions.action(responseErrorClient, document, keys, params)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
        expect(result).toHaveProperty('payload.client', responseErrorClient)
        expect(result).toHaveProperty('payload.document', document)
        expect(result).toHaveProperty('payload.keys', keys)
        expect(result).toHaveProperty('payload.params', params)
        expect(result).toHaveProperty('payload.error')
        expect(result.payload.error).toBeInstanceOf(Error)
      }
    )
  })
})


describe('get', () => {
  const url = 'http://example.com/api/v1/'

  test('dispatches CLIENT_GET_REQUEST', () => {
    const action = actions.get(client, url)
    const promise = store.dispatch(action)

    const storeActions = store.getActions()
    expect(storeActions.length).toBe(1)

    const request = storeActions[0]
    expect(request).toHaveProperty('type', CLIENT_GET_REQUEST)
    expect(request).toHaveProperty('payload.client', client)
    expect(request).toHaveProperty('payload.url', url)

    return promise
  })

  test('dispatches CLIENT_GET_SUCCESS for normal response', () => {
    const action = actions.get(client, url)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_GET_SUCCESS)
        expect(result).toHaveProperty('payload.client', client)
        expect(result).toHaveProperty('payload.url', url)
        // Mock client just returns `true` on success, not an actual document
        expect(result).toHaveProperty('payload.document', true)
      }
    )
  })

  test('dispatches CLIENT_GET_FAILURE for error request', () => {
    const action = actions.get(requestErrorClient, url)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_GET_FAILURE)
        expect(result).toHaveProperty('payload.client', requestErrorClient)
        expect(result).toHaveProperty('payload.url', url)
        expect(result).toHaveProperty('payload.error')
        expect(result.payload.error).toBeInstanceOf(Error)
      }
    )
  })

  test('dispatches CLIENT_GET_FAILURE for error response', () => {
    const action = actions.get(responseErrorClient, url)
    return store.dispatch(action).then(
      result => {
        expect(result).toHaveProperty('type', CLIENT_GET_FAILURE)
        expect(result).toHaveProperty('payload.client', responseErrorClient)
        expect(result).toHaveProperty('payload.url', url)
        expect(result).toHaveProperty('payload.error')
        expect(result.payload.error).toBeInstanceOf(Error)
      }
    )
  })
})


test('ignores irrelevant actions', async () => {
  const types = [
    'THIRD_PARTY',
    CLIENT_ACTION_FAILURE,
    CLIENT_ACTION_REQUEST,
    CLIENT_ACTION_SUCCESS,
    CLIENT_GET_FAILURE,
    CLIENT_GET_REQUEST,
    CLIENT_GET_SUCCESS,
  ]
  for (let type of types) {
    store = mockStore()
    await store.dispatch({ type })
    expect(store.getActions().length).toBe(1)
  }
})
