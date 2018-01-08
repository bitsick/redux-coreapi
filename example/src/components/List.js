import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Error, Loading } from './common'


function ToDo({ complete, description, id }) {
  return (
    <div className="todo">
      <div className="todo-detail-link">
        <Link to={`todos/${id}`}>
          <span role="img" aria-label="Details" title="Details">📄</span>
        </Link>
      </div>
      <div className="todo-edit-link">
        <Link to={`todos/${id}/edit`}>
          <span role="img" aria-label="Edit" title="Edit">✏️</span>
        </Link>
      </div>
      <div className="todo-delete-link">
        <Link to={`todos/${id}/delete`}>
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


export default class List extends Component {
  componentWillMount() {
    this.props.list(this.props.schema)
  }

  render() {
    const { error, loading, todos } = this.props

    let content
    if (error) {
      content = <Error error={error} />
    }
    else if (loading) {
      content = <Loading />
    }
    else {
      content = []
      for (let todo of todos) {
        content.push(
          <ToDo key={todo.id} {...todo} />
        )
      }
    }

    return (
      <div className="todo-list">
        <h2>All To-Dos</h2>
        {content}
        <div>
          <Link to="todos/create">Create To-Do</Link>
        </div>
      </div>
    )
  }
}
