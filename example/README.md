# redux-coreapi Example

This directory contains a complete [React](https://reactjs.org/) client and
[Django](https://djangoproject.com/) server for a small to-do application to
demostrate `redux-coreapi` usage.

## Getting Started

### Prerequisites

#### Server

The server is a
[Django 2.0](https://docs.djangoproject.com/en/2.0/releases/2.0/)
application, and as such requires
[Python 3.4+](https://www.python.org/downloads/).

To avoid conflicts, create a
[virtual environment](https://docs.python.org/3/tutorial/venv.html) for the
server dependencies. Install the dependencies with `pip`

```bash
$ pip install -r requirements.txt
```

#### Client

Install the client dependencies with `npm`

```bash
$ npm i
```

or `yarn`

```bash
$ yarn
```

### Installation

Beyond the dependencies, neither the client nor the server require any
installation.

## Usage

### Server

The server is a simple Django application containing a single `ToDo` model. A
REST API and [Core API](http://coreapi.org) schema are provided by
[Django REST Framework](http://django-rest-framework.org/).

Prior to running the server, run migrations with Django's `migrate` command

```bash
$ python manage.py migrate
```

Start the server with Django's `runserver` command

```bash
$ python manage.py runserver
```

### Client

The client provides a user interface for the to-do application. The server must
be running for the client to function correctly. Start the client with `npm`

```bash
$ npm run start
```

or `yarn`

```bash
$ yarn start
```

[`redux-devtools`](https://github.com/gaearon/redux-devtools) are available in
the client. Press `ctrl+h` in the browser to access to the tools.

## Implementation Details

The `App` component and container demonstrate usage of `get` to request a Core
API schema document. The `schema` reducer the watches for `CLIENT_GET_*`
actions the store the schema document or related errors.

The `List` and `Detail` components and containers demonstrate simple usage of
`action` to request data from the server. The `Create`, `Delete`, and `Edit`
components and containers demonstrate using `action` to send data to the
server, as well as more complex behavior, such as `await`ing responses. The
`todos` reducer wathces for `CLIENT_ACTION_*` actions to store `ToDo` model
data.
