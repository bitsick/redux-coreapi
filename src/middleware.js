import {
  CLIENT_ACTION,
  CLIENT_ACTION_FAILURE,
  CLIENT_ACTION_REQUEST,
  CLIENT_ACTION_SUCCESS,
  CLIENT_GET,
  CLIENT_GET_FAILURE,
  CLIENT_GET_REQUEST,
  CLIENT_GET_SUCCESS
} from './types'


/**
 * Redux middleware that processes Core API action and document requests.
 *
 * For both Core API `action` and `get` requests made by calling the
 * corresponding `redux-coreapi` {@link action} and {@link get} functions,
 * the behavior is as follows:
 *
 * 1. A {@link ClientActionRequest} or {@link ClientGetRequest} is dispatched
 *    with the data used to make the request.
 * 2. The supplied `coreapi.Client` is used to asynchronously make the request.
 * 3. Upon completion, a Redux action for the result is dispatched:
 *    - On success, a {@link ClientActionSuccess} or {@link ClientGetSuccess}
 *      is dispatched with the request and response data.
 *    - On failure, a {@link ClientActionFailure} or {@link ClientGetFailure}
 *      is dispatched with the request and error data.
 *
 * Any other action types will not be processed.
 *
 * @alias coreapiMiddleware
 */
// eslint-disable-next-line no-unused-vars
export default store => next => action => {
  if (action.type === CLIENT_ACTION) {
    const { client, document, keys, params } = action.payload

    next({
      type: CLIENT_ACTION_REQUEST,
      payload: { client, document, keys, params },
    })

    try {
      return client.action(document, keys, params).then(
        result => next({
          type: CLIENT_ACTION_SUCCESS,
          payload: { client, document, keys, params, result },
        }),
        error => next({
          type: CLIENT_ACTION_FAILURE,
          payload: { client, document, keys, params, error },
        })
      )
    }
    catch (error) {
      return next({
        type: CLIENT_ACTION_FAILURE,
        payload: { client, document, keys, params, error },
      })
    }
  }
  else if (action.type === CLIENT_GET) {
    const { client, url } = action.payload

    next({
      type: CLIENT_GET_REQUEST,
      payload: { client, url },
    })

    try {
      return client.get(url).then(
        document => next({
          type: CLIENT_GET_SUCCESS,
          payload: { client, url, document },
        }),
        error => next({
          type: CLIENT_GET_FAILURE,
          payload: { client, url, error },
        })
      )
    }
    catch (error) {
      return next({
        type: CLIENT_GET_FAILURE,
        payload: { client, url, error },
      })
    }
  }
  else {
    return next(action)
  }
}
