# `redux-coreapi` API Reference

## Constants

<dl>
<dt><a href="#CLIENT_ACTION">CLIENT_ACTION</a></dt>
<dd><p>Dispatched by <a href="#action">action</a> to initiate a Core API action request.</p>
</dd>
<dt><a href="#CLIENT_ACTION_FAILURE">CLIENT_ACTION_FAILURE</a> : <code>string</code></dt>
<dd><p>Dispatched when a Core API action request fails.</p>
</dd>
<dt><a href="#CLIENT_ACTION_REQUEST">CLIENT_ACTION_REQUEST</a> : <code>string</code></dt>
<dd><p>Dispatched immediately before a Core API action request is sent.</p>
</dd>
<dt><a href="#CLIENT_ACTION_SUCCESS">CLIENT_ACTION_SUCCESS</a> : <code>string</code></dt>
<dd><p>Dispatched when a Core API action request succeeds.</p>
</dd>
<dt><a href="#CLIENT_GET">CLIENT_GET</a></dt>
<dd><p>Dispatched by <a href="#get">get</a> to initiate a Core API document request.</p>
</dd>
<dt><a href="#CLIENT_GET_FAILURE">CLIENT_GET_FAILURE</a> : <code>string</code></dt>
<dd><p>Dispatched when a Core API document request fails.</p>
</dd>
<dt><a href="#CLIENT_GET_REQUEST">CLIENT_GET_REQUEST</a> : <code>string</code></dt>
<dd><p>Dispatched immediately before a Core API document request is sent.</p>
</dd>
<dt><a href="#CLIENT_GET_SUCCESS">CLIENT_GET_SUCCESS</a> : <code>string</code></dt>
<dd><p>Dispatched when a Core API document request succeeds.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#action">action(client, document, keys, [params])</a> ⇒ <code><a href="#ClientAction">ClientAction</a></code></dt>
<dd><p>Make a Core API action request.</p>
</dd>
<dt><a href="#get">get(client)</a> ⇒ <code><a href="#ClientGet">ClientGet</a></code></dt>
<dd><p>Make a Core API document request.</p>
</dd>
<dt><a href="#coreapiMiddleware">coreapiMiddleware()</a></dt>
<dd><p>Redux middleware that processes Core API action and document requests.</p>
<p>For both Core API <code>action</code> and <code>get</code> requests made by calling the
corresponding <code>redux-coreapi</code> <a href="#action">action</a> and <a href="#get">get</a> functions,
the behavior is as follows:</p>
<ol>
<li>A <a href="#ClientActionRequest">ClientActionRequest</a> or <a href="#ClientGetRequest">ClientGetRequest</a> is dispatched
with the data used to make the request.</li>
<li>The supplied <code>coreapi.Client</code> is used to asynchronously make the request.</li>
<li>Upon completion, a Redux action for the result is dispatched:<ul>
<li>On success, a <a href="#ClientActionSuccess">ClientActionSuccess</a> or <a href="#ClientGetSuccess">ClientGetSuccess</a>
is dispatched with the request and response data.</li>
<li>On failure, a <a href="#ClientActionFailure">ClientActionFailure</a> or <a href="#ClientGetFailure">ClientGetFailure</a>
is dispatched with the request and error data.</li>
</ul>
</li>
</ol>
<p>Any other action types will not be processed.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ClientAction">ClientAction</a> : <code>Object</code></dt>
<dd><p>Contains the data for an <a href="#action">action</a> call.</p>
</dd>
<dt><a href="#ClientActionFailure">ClientActionFailure</a> : <code>Object</code></dt>
<dd><p>Contains the data for a failed Core API action request.</p>
</dd>
<dt><a href="#ClientActionRequest">ClientActionRequest</a> : <code>Object</code></dt>
<dd><p>Contains the data for a Core API action request.</p>
</dd>
<dt><a href="#ClientActionSuccess">ClientActionSuccess</a> : <code>Object</code></dt>
<dd><p>Contains the response data for a successful Core API action request.</p>
</dd>
<dt><a href="#ClientGet">ClientGet</a> : <code>Object</code></dt>
<dd><p>Contains the data for a <a href="#get">get</a> call.</p>
</dd>
<dt><a href="#ClientGetFailure">ClientGetFailure</a> : <code>Object</code></dt>
<dd><p>Contains the data for a failed Core API document request.</p>
</dd>
<dt><a href="#ClientGetRequest">ClientGetRequest</a> : <code>Object</code></dt>
<dd><p>Contains the data for a Core API document request.</p>
</dd>
<dt><a href="#ClientGetSuccess">ClientGetSuccess</a> : <code>Object</code></dt>
<dd><p>Contains the response data for a successful Core API document request.</p>
</dd>
</dl>

<a name="CLIENT_ACTION"></a>

## CLIENT_ACTION
Dispatched by [action](#action) to initiate a Core API action request.

**Kind**: global constant  
<a name="CLIENT_ACTION_FAILURE"></a>

## CLIENT_ACTION_FAILURE : <code>string</code>
Dispatched when a Core API action request fails.

**Kind**: global constant  
<a name="CLIENT_ACTION_REQUEST"></a>

## CLIENT_ACTION_REQUEST : <code>string</code>
Dispatched immediately before a Core API action request is sent.

**Kind**: global constant  
<a name="CLIENT_ACTION_SUCCESS"></a>

## CLIENT_ACTION_SUCCESS : <code>string</code>
Dispatched when a Core API action request succeeds.

**Kind**: global constant  
<a name="CLIENT_GET"></a>

## CLIENT_GET
Dispatched by [get](#get) to initiate a Core API document request.

**Kind**: global constant  
<a name="CLIENT_GET_FAILURE"></a>

## CLIENT_GET_FAILURE : <code>string</code>
Dispatched when a Core API document request fails.

**Kind**: global constant  
<a name="CLIENT_GET_REQUEST"></a>

## CLIENT_GET_REQUEST : <code>string</code>
Dispatched immediately before a Core API document request is sent.

**Kind**: global constant  
<a name="CLIENT_GET_SUCCESS"></a>

## CLIENT_GET_SUCCESS : <code>string</code>
Dispatched when a Core API document request succeeds.

**Kind**: global constant  
<a name="action"></a>

## action(client, document, keys, [params]) ⇒ [<code>ClientAction</code>](#ClientAction)
Make a Core API action request.

**Kind**: global function  
**Returns**: [<code>ClientAction</code>](#ClientAction) - - A Redux action for the Core API action request.
  If an argument contains invalid data, a {@see ClientActionError} will be
  returned instead.  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>coreapi.Client</code> | The Core API client instance with which the   request will be made. |
| document | <code>coreapi.Document</code> | The Core API document describing   the API to which the request will be sent. |
| keys | <code>Array.&lt;string&gt;</code> | An array of strings describing the action to   request. For example, `["users", "list"]` or `["widgets", 0, "update"]`. |
| [params] | <code>Object</code> | Optional data to include with the request. The   structure of the object depends on the action being requested. |

<a name="get"></a>

## get(client) ⇒ [<code>ClientGet</code>](#ClientGet)
Make a Core API document request.

**Kind**: global function  
**Returns**: [<code>ClientGet</code>](#ClientGet) - - A Redux action for the Core API get request.  If an
  argument contains invalid data, a {@see ClientGetError} will be returned
  instead.  

| Param | Type | Description |
| --- | --- | --- |
| client | <code>coreapi.Client</code> | The Core API client instance with which the   request will be made. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the document to request. |

<a name="coreapiMiddleware"></a>

## coreapiMiddleware()
Redux middleware that processes Core API action and document requests.

For both Core API `action` and `get` requests made by calling the
corresponding `redux-coreapi` [action](#action) and [get](#get) functions,
the behavior is as follows:

1. A [ClientActionRequest](#ClientActionRequest) or [ClientGetRequest](#ClientGetRequest) is dispatched
   with the data used to make the request.
2. The supplied `coreapi.Client` is used to asynchronously make the request.
3. Upon completion, a Redux action for the result is dispatched:
   - On success, a [ClientActionSuccess](#ClientActionSuccess) or [ClientGetSuccess](#ClientGetSuccess)
     is dispatched with the request and response data.
   - On failure, a [ClientActionFailure](#ClientActionFailure) or [ClientGetFailure](#ClientGetFailure)
     is dispatched with the request and error data.

Any other action types will not be processed.

**Kind**: global function  
<a name="ClientAction"></a>

## ClientAction : <code>Object</code>
Contains the data for an [action](#action) call.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_ACTION}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.document | <code>coreapi.Document</code> | The Core API schema document   describing the API to which the request will be sent. |
| payload.keys | <code>Array.&lt;string&gt;</code> | An array of strings describing the   action to request. For example, `["users", "list"]` or   `["widgets", 0, "update"]`. |
| payload.params | <code>Object</code> | Optional data to include with the   request. The structure of the object depends on the action being   requested. |

<a name="ClientActionFailure"></a>

## ClientActionFailure : <code>Object</code>
Contains the data for a failed Core API action request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_ACTION_FAILURE}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request was be made. |
| payload.document | <code>coreapi.Document</code> | The Core API schema document   describing the API to which the request was sent. |
| payload.keys | <code>Array.&lt;string&gt;</code> | An array of strings describing the   action that was requested. For example, `["users", "list"]` or   `["widgets", 0, "update"]`. |
| payload.params | <code>Object</code> | Optional data included with the   request. The structure of the object depends on the action requested. |
| payload.error | <code>Error</code> | The error encountered by the action   request. |

<a name="ClientActionRequest"></a>

## ClientActionRequest : <code>Object</code>
Contains the data for a Core API action request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_ACTION_REQUEST}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.document | <code>coreapi.Document</code> | The Core API schema document   describing the API to which the request will be sent. |
| payload.keys | <code>Array.&lt;string&gt;</code> | An array of strings describing the   action to request. For example, `["users", "list"]` or   `["widgets", 0, "update"]`. |
| payload.params | <code>Object</code> | Optional data to include with the   request. The structure of the object depends on the action being   requested. |

<a name="ClientActionSuccess"></a>

## ClientActionSuccess : <code>Object</code>
Contains the response data for a successful Core API action request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_ACTION_SUCCESS}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request was be made. |
| payload.document | <code>coreapi.Document</code> | The Core API schema document   describing the API to which the request was sent. |
| payload.keys | <code>Array.&lt;string&gt;</code> | An array of strings describing the   action that was requested. For example, `["users", "list"]` or   `["widgets", 0, "update"]`. |
| payload.params | <code>Object</code> | Optional data included with the   request. The structure of the object depends on the action requested. |
| payload.result | <code>Object</code> | The response data from the request. |

<a name="ClientGet"></a>

## ClientGet : <code>Object</code>
Contains the data for a [get](#get) call.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_GET}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.url | <code>string</code> | The URL of the document being requested. |

<a name="ClientGetFailure"></a>

## ClientGetFailure : <code>Object</code>
Contains the data for a failed Core API document request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_GET_FAILURE}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.url | <code>string</code> | The URL of the document that was requested. |
| payload.error | <code>Error</code> | The error encountered by the document   request. |

<a name="ClientGetRequest"></a>

## ClientGetRequest : <code>Object</code>
Contains the data for a Core API document request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_GET_REQUEST}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.url | <code>string</code> | The URL of the document being requested. |

<a name="ClientGetSuccess"></a>

## ClientGetSuccess : <code>Object</code>
Contains the response data for a successful Core API document request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the Redux action. Must always be set   to {@see CLIENT_GET_SUCCESS}. |
| payload | <code>Object</code> | An object containing the data for the request. |
| payload.client | <code>coreapi.Client</code> | The Core API client instance   with which the request will be made. |
| payload.url | <code>string</code> | The URL of the document that was requested. |
| payload.document | <code>coreapi.Document</code> | The Core API document. |

