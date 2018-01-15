import {
  CLIENT_ACTION,
  CLIENT_ACTION_FAILURE,
  CLIENT_GET,
  CLIENT_GET_FAILURE
} from './types'


/**
 * Make a Core API action request.
 *
 * @param {coreapi.Client} client - The Core API client instance with which the
 *   request will be made.
 * @param {coreapi.Document} document - The Core API document describing
 *   the API to which the request will be sent.
 * @param {string[]} keys - An array of strings describing the action to
 *   request. For example, `["users", "list"]` or `["widgets", 0, "update"]`.
 * @param {Object} [params] - Optional data to include with the request. The
 *   structure of the object depends on the action being requested.
 * @returns {ClientAction} - A Redux action for the Core API action request.
 *   If an argument contains invalid data, a {@link ClientActionError} will be
 *   returned instead.
 */
export function action(client, document, keys, params) {
  try {
    validateClient(client)
  }
  catch (error) {
    return {
      type: CLIENT_ACTION_FAILURE,
      payload: {
        client,
        document,
        keys,
        params,
        error
      }
    }
  }

  if (!document || !document.url || !document.content) {
    return {
      type: CLIENT_ACTION_FAILURE,
      payload: {
        client,
        document,
        keys,
        params,
        error: new TypeError(document + ' is not a valid Core API document.')
      }
    }
  }

  if (!Array.isArray(keys)) {
    return {
      type: CLIENT_ACTION_FAILURE,
      payload: {
        client,
        document,
        keys,
        params,
        error: new TypeError(keys + ' is not a valid key array.')
      }
    }
  }

  for (let key of keys) {
    if (typeof key !== 'string') {
      return {
        type: CLIENT_ACTION_FAILURE,
        payload: {
          client,
          document,
          keys,
          params,
          error: new TypeError(key + ' is not a valid key.')
        }
      }
    }
  }

  return {
    type: CLIENT_ACTION,
    payload: { client, document, keys, params }
  }
}


/**
 * Make a Core API document request.
 *
 * @param {coreapi.Client} client - The Core API client instance with which the
 *   request will be made.
 * @property {string} url - The URL of the document to request.
 * @returns {ClientGet} - A Redux action for the Core API get request.  If an
 *   argument contains invalid data, a {@link ClientGetError} will be returned
 *   instead.
 */
export function get(client, url) {
  try {
    validateClient(client)
  }
  catch (error) {
    return {
      type: CLIENT_GET_FAILURE,
      payload: {
        client,
        url,
        error
      }
    }
  }

  if (typeof url !== 'string') {
    return {
      type: CLIENT_GET_FAILURE,
      payload: {
        client,
        url,
        error: new TypeError('URL must be a string.')
      }
    }
  }

  return {
    type: CLIENT_GET,
    payload: { client, url }
  }
}


/**
 * Ensure an object is a valid Core API client. Raises a `TypeError` if not.
 *
 * @param {} client - The object to validate.
 * @ignore
 */
function validateClient(client) {
  const invalid = (
    !client ||
    typeof client.action !== 'function' ||
    typeof client.get !== 'function'
  )
  if (invalid) {
    throw new TypeError(client + ' is not a valid Core API client.')
  }
}
