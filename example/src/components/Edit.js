import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CLIENT_ACTION_FAILURE, CLIENT_ACTION_SUCCESS } from 'redux-coreapi'

import { Error, Loading, NotFound } from './common'


export default class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      complete: undefined,
      description: undefined,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeComplete = this.onChangeComplete.bind(this)
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
          <form>
            <div>
              <div>
                <label htmlFor="complete">Complete</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="complete"
                  name="complete"
                  checked={complete}
                  onChange={this.onChangeComplete}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="description">Description</label>
              </div>
              <div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.onChangeDescription}
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
        <h2>Edit To-Do</h2>
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

  async onSubmit(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({ loading: true })

    const { complete, description } = this.state
    const response = await this.props.edit(
      this.props.schema,
      { complete, description },
    )

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
