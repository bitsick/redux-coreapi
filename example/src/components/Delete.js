import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CLIENT_ACTION_FAILURE, CLIENT_ACTION_SUCCESS } from 'redux-coreapi'

import { Error, Loading, NotFound } from './common'


export default class Delete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      complete: undefined,
      description: undefined,
    }

    this.onConfirm = this.onConfirm.bind(this)
  }

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
      const complete = this.state.complete !== undefined ?
        this.state.complete :
        instance.complete
      const description = this.state.description !== undefined ?
        this.state.description :
        instance.description

      content = (
        <div>
          <div className="todo">
            <div className="todo-complete">
              <input type="checkbox" checked={complete} disabled />
            </div>
            <div className="todo-description">{description}</div>
          </div>
          <form>
            <button
              type="button"
              disabled={this.state.loading}
              onClick={this.onConfirm}
            >
              Confirm
            </button>
          </form>
          { this.state.error ? <Error error={this.state.error} /> : null }
        </div>
      )
    }
    else if (loading) {
      content = <Loading />
    }
    else {
      content = <NotFound id={id} />
    }

    return (
      <div className="todo-edit">
        <h2>Delete To-Do</h2>
        {content}
        <div>
          <Link to={`/todos/${id}`}>« Back to to-do detail</Link>
        </div>
      </div>
    )
  }

  onChangeComplete(e) {
    this.setState({ complete: e.target.checked })
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value })
  }

  async onConfirm(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({ loading: true })
    const response = await this.props.delete(this.props.schema)
    this.setState({ loading: false })

    if (response.type === CLIENT_ACTION_SUCCESS) {
      this.setState({ error: undefined })
      this.props.redirect()
    }
    else if (response.type === CLIENT_ACTION_FAILURE) {
      this.setState({ error: response.payload.error })
    }
  }
}
