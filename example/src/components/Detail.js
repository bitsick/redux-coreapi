import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Error, Loading, NotFound } from './common'


function ToDo({ complete, description, id }) {
  return (
    <div className="todo">
      <div className="todo-edit-link">
        <Link to={`/todos/${id}/edit`}>
          <span role="img" aria-label="Edit" title="Edit">✏️</span>
        </Link>
      </div>
      <div className="todo-delete-link">
        <Link to={`/todos/${id}/delete`}>
          <span role="img" aria-label="Delete" title="Delete">🗑</span>
        </Link>
      </div>
      <div className="todo-complete">
        <input type="checkbox" checked={complete} disabled />
      </div>
      <div className="todo-description">{description}</div>
    </div>
  )
}


export default class Detail extends Component {
  componentWillMount() {
    const { instance, read, schema } = this.props
    if (!instance) {
      read(schema)
    }
  }

  render() {
    const { error, loading, instance } = this.props
    const id = this.props.match.params.id

    let content
    if (error) {
      content = <Error error={error} />
    }
    else if (instance) {
      content = <ToDo id={id} {...instance} />
    }
    else if (loading) {
      content = <Loading />
    }
    else {
      content = <NotFound id={id} />
    }

    return (
      <div className="todo-detail">
        <h2>To-Do Detail</h2>
        {content}
        <div>
          <Link to="/todos">« Back to all to-dos</Link>
        </div>
      </div>
    )
  }
}
