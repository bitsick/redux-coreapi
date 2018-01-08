# `redux-coreapi`

`redux-coreapi` is a minimal interface between Redux and Core API JavaScript
clients. More specifically, `redux-coreapi` dispatches Redux actions for Core
API action and document request-response cycles, allowing Core API clients to
be integrated simply into Redux applications.

## Getting Started

### Prerequisites

`redux-coreapi` does not have any prerequisites or direct dependencies, but it
is assumed that it will be used alongside
[redux](https://github.com/reactjs/redux) and
[coreapi](https://github.com/core-api/javascript-client).

### Installation

Install with `npm`

```bash
$ npm i redux-coreapi
```

or `yarn`

```bash
$ yarn add redux-coreapi
```

## Usage

Begin by applying the `redux-coreapi` middleware to the store. For example:

```javascript
import { createStore, applyMiddleware } from 'redux'
import { coreapiMiddleware } from 'redux-coreapi'
import reducer from './reducer'

const store = createStore(
  reducer,
  applyMiddleware(coreapiMiddleware)
)
```

Use the `get` and `action` action creators to make Core API document and action
requests, respectively.

```javascript
import coreapi from 'coreapi'
import { action, get } from 'redux-coreapi'
import document from './path/to/existing/document'

const client = new coreapi.Client()

// Load a Core API schema document
store.dispatch(get(client, 'https://example.com/api/v1/schema'))

// Send a request to create a new object
store.dispatch(action(
  client,
  document,
  ['objects', 'create'],
  {
    name: 'Example',
    description: 'redux-coreapi example object',
  }
))
```

## API

Full API documentation is available in [`docs/api.md`](./docs/api.md) file
or at https://bitsick.github.io/redux-coreapi/api.md.

### `get(client, url)`

Make a Core API document request.

#### Parameters

* `client` _(coreapi.Client)_ The Core API client instance with which the
  request will be made.
* `url` _(string)_ The URL of the document to request.

#### Returns

_(Object)_ A Redux action for the Core API get request.

### `action(client, document, keys, [params])`

Make a Core API action request.

#### Parameters

* `client` _(coreapi.Client)_ The Core API client instance with which the
  request will be made.
* `document` _(coreapi.Document)_ The Core API document describing the API
  to which the request will be sent.
* `keys` _(string[])_ An array of strings describing the action to request. For
  example, `["users", "list"]` or `["widgets", 0, "update"]`.
* `[params]` _(Object)_ Optional data to include with the request. The
  structure of the object depends on the action being requested.

#### Returns

_(Object)_ A Redux action for the Core API action request.

## Examples

See the [`example`](./example) directory for a complete working example.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on making contributions.

## Versioning

This repository uses
[GitFlow](http://datasift.github.io/gitflow/IntroducingGitFlow.html) and
[semantic versioning](https://semver.org/). See the [tags](./tags) in the
`master` branch for the available versions.

## License

Apache License 2.0
