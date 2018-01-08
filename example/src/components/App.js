import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Create from '../containers/Create'
import Delete from '../containers/Delete'
import Detail from '../containers/Detail'
import Edit from '../containers/Edit'
import List from '../containers/List'
import { Error, Loading } from './common'
import DevTools from './DevTools'


export default class App extends Component {
  componentWillMount() {
    this.props.get()
  }

  render() {
    const { error, loading = true, match } = this.props

    let content
    if (error) {
      content = <Error error={error} />
    }
    else if (loading) {
      content = <Loading />
    }
    else {
      content = (
        <Switch>
          <Route path={`${match.url}/create`} component={Create} />
          <Route path={`${match.url}/:id/delete`} component={Delete} />
          <Route path={`${match.url}/:id/edit`} component={Edit} />
          <Route path={`${match.url}/:id`} component={Detail} />
          <Route path={match.url} component={List} />
        </Switch>
      )
    }

    return (
      <div className="app">
        <h1><code>redux-coreapi</code> Example</h1>
        {content}
        <DevTools />
      </div>
    )
  }
}
