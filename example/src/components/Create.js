import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CLIENT_ACTION_FAILURE, CLIENT_ACTION_SUCCESS } from 'redux-coreapi'

import { Error } from './common'


export default class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      description: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  render() {
    return (
      <div className="todo-create">
        <h2>Create To-Do</h2>
        <form>
          <div>
            <div>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div>
            <input
              type="submit"
              onClick={this.onSubmit}
              disabled={this.state.loading}
            />
          </div>
        </form>
        { this.state.error ? <Error error={this.state.error} /> : null }
        <Link to="/todos">« Back to all to-dos</Link>
      </div>
    )
  }

  onChange(e) {
    this.setState({ description: e.target.value })
  }

  async onSubmit(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({ loading: true })

    const response = await this.props.create(
      this.props.schema,
      this.state.description,
    )

    this.setState({ loading: false })

    if (response.type === CLIENT_ACTION_SUCCESS) {
      this.setState({ error: null })
      this.props.redirect(response.payload.result.id)
    }
    else if (response.type === CLIENT_ACTION_FAILURE) {
      this.setState({ error: response.payload.error })
    }
  }
}
