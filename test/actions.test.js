import * as actions from '../src/actions'
import {
  CLIENT_ACTION,
  CLIENT_ACTION_FAILURE,
  CLIENT_GET,
  CLIENT_GET_FAILURE,
} from '../src/types'
import { client, document } from './mocks'


describe('action', () => {
  const keys = ['objects', 'list']
  const params = {}

  test('returns a valid object for valid arguments', () => {
    const result = actions.action(client, document, keys, params)
    expect(result).toHaveProperty('type', CLIENT_ACTION)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.document', document)
    expect(result).toHaveProperty('payload.keys', keys)
    expect(result).toHaveProperty('payload.params', params)
  })

  test('does not require a params argument', () => {
    const result = actions.action(client, document, keys)
    expect(result).toHaveProperty('type', CLIENT_ACTION)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.document', document)
    expect(result).toHaveProperty('payload.keys', keys)
    expect(result).toHaveProperty('payload.params', undefined)
  })

  test('rejects an invalid client argument', () => {
    const result = actions.action({}, document, keys, params)
    expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
    expect(result).toHaveProperty('payload.client', {})
    expect(result).toHaveProperty('payload.document', document)
    expect(result).toHaveProperty('payload.keys', keys)
    expect(result).toHaveProperty('payload.params', params)
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })

  test('rejects an invalid document argument', () => {
    const result = actions.action(client, {}, keys, params)
    expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.document', {})
    expect(result).toHaveProperty('payload.keys', keys)
    expect(result).toHaveProperty('payload.params', params)
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })

  test('rejects an invalid keys argument', () => {
    const result = actions.action(client, document, '', params)
    expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.document', document)
    expect(result).toHaveProperty('payload.keys', '')
    expect(result).toHaveProperty('payload.params', params)
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })

  test('rejects keys array with invalid elements', () => {
    const result = actions.action(client, document, [{}, {}], params)
    expect(result).toHaveProperty('type', CLIENT_ACTION_FAILURE)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.document', document)
    expect(result).toHaveProperty('payload.keys', [{}, {}])
    expect(result).toHaveProperty('payload.params', params)
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })
})


describe('get', () => {
  const url = 'http://example.com'

  test('returns a valid object for valid arguments', () => {
    const result = actions.get(client, url)
    expect(result).toHaveProperty('type', CLIENT_GET)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.url', url)
  })

  test('rejects an invalid client argument', () => {
    const result = actions.get({}, url)
    expect(result).toHaveProperty('type', CLIENT_GET_FAILURE)
    expect(result).toHaveProperty('payload.client', {})
    expect(result).toHaveProperty('payload.url', url)
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })

  test('rejects an invalid url argument', () => {
    const result = actions.get(client, {})
    expect(result).toHaveProperty('type', CLIENT_GET_FAILURE)
    expect(result).toHaveProperty('payload.client', client)
    expect(result).toHaveProperty('payload.url', {})
    expect(result.payload.error).toBeInstanceOf(TypeError)
  })
})
