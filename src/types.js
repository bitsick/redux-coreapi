/**
 * Dispatched by {@link action} to initiate a Core API action request.
 * @type string
 */
export const CLIENT_ACTION = 'redux-coreapi:CLIENT_ACTION'


/**
 * Contains the data for an {@link action} call.
 *
 * @typedef {Object} ClientAction
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_ACTION}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {coreapi.Document} payload.document - The Core API schema document
 *   describing the API to which the request will be sent.
 * @property {string[]} payload.keys - An array of strings describing the
 *   action to request. For example, `["users", "list"]` or
 *   `["widgets", 0, "update"]`.
 * @property {Object} [payload.params] - Optional data to include with the
 *   request. The structure of the object depends on the action being
 *   requested.
 */


/**
 * Dispatched when a Core API action request fails.
 * @type string
 */
export const CLIENT_ACTION_FAILURE = 'redux-coreapi:CLIENT_ACTION_FAILURE'


/**
 * Contains the data for a failed Core API action request.
 *
 * @typedef {Object} ClientActionFailure
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_ACTION_FAILURE}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request was be made.
 * @property {coreapi.Document} payload.document - The Core API schema document
 *   describing the API to which the request was sent.
 * @property {string[]} payload.keys - An array of strings describing the
 *   action that was requested. For example, `["users", "list"]` or
 *   `["widgets", 0, "update"]`.
 * @property {Object} [payload.params] - Optional data included with the
 *   request. The structure of the object depends on the action requested.
 * @property {Error} payload.error - The error encountered by the action
 *   request.
 */


/**
 * Dispatched immediately before a Core API action request is sent.
 * @type string
 */
export const CLIENT_ACTION_REQUEST = 'redux-coreapi:CLIENT_ACTION_REQUEST'


/**
 * Contains the data for a Core API action request.
 *
 * @typedef {Object} ClientActionRequest
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_ACTION_REQUEST}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {coreapi.Document} payload.document - The Core API schema document
 *   describing the API to which the request will be sent.
 * @property {string[]} payload.keys - An array of strings describing the
 *   action to request. For example, `["users", "list"]` or
 *   `["widgets", 0, "update"]`.
 * @property {Object} [payload.params] - Optional data to include with the
 *   request. The structure of the object depends on the action being
 *   requested.
 */


/**
 * Dispatched when a Core API action request succeeds.
 * @type string
 */
export const CLIENT_ACTION_SUCCESS = 'redux-coreapi:CLIENT_ACTION_SUCCESS'


/**
 * Contains the response data for a successful Core API action request.
 *
 * @typedef {Object} ClientActionSuccess
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_ACTION_SUCCESS}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request was be made.
 * @property {coreapi.Document} payload.document - The Core API schema document
 *   describing the API to which the request was sent.
 * @property {string[]} payload.keys - An array of strings describing the
 *   action that was requested. For example, `["users", "list"]` or
 *   `["widgets", 0, "update"]`.
 * @property {Object} [payload.params] - Optional data included with the
 *   request. The structure of the object depends on the action requested.
 * @property {Object} payload.result - The response data from the request.
 */


/**
 * Dispatched by {@link get} to initiate a Core API document request.
 * @type string
 */
export const CLIENT_GET = 'redux-coreapi:CLIENT_GET'


/**
 * Contains the data for a {@link get} call.
 *
 * @typedef {Object} ClientGet
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_GET}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {string} payload.url - The URL of the document being requested.
 */


/**
 * Dispatched when a Core API document request fails.
 * @type string
 */
export const CLIENT_GET_FAILURE = 'redux-coreapi:CLIENT_GET_FAILURE'


/**
 * Contains the data for a failed Core API document request.
 *
 * @typedef {Object} ClientGetFailure
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_GET_FAILURE}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {string} payload.url - The URL of the document that was requested.
 * @property {Error} payload.error - The error encountered by the document
 *   request.
 */


/**
 * Dispatched immediately before a Core API document request is sent.
 * @type string
 */
export const CLIENT_GET_REQUEST = 'redux-coreapi:CLIENT_GET_REQUEST'


/**
 * Contains the data for a Core API document request.
 *
 * @typedef {Object} ClientGetRequest
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_GET_REQUEST}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {string} payload.url - The URL of the document being requested.
 */


/**
 * Dispatched when a Core API document request succeeds.
 * @type string
 */
export const CLIENT_GET_SUCCESS = 'redux-coreapi:CLIENT_GET_SUCCESS'


/**
 * Contains the response data for a successful Core API document request.
 *
 * @typedef {Object} ClientGetSuccess
 * @property {string} type - The type of the Redux action. Must always be set
 *   to {@link CLIENT_GET_SUCCESS}.
 * @property {Object} payload - An object containing the data for the request.
 * @property {coreapi.Client} payload.client - The Core API client instance
 *   with which the request will be made.
 * @property {string} payload.url - The URL of the document that was requested.
 * @property {coreapi.Document} payload.document - The Core API document.
 */
