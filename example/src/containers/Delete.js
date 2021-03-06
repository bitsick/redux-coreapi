import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { action } from 'redux-coreapi'

import { client } from '../api'
import Delete from '../components/Delete'


function mapStateToProps({ schema, todos }, ownProps) {
  const data = todos.data[ownProps.match.params.id]
  const { error, instance, loading = true } = data || {}
  return {
    error,
    loading,
    instance,
    schema: schema.schema,
  }
}


function mapDispatchToProps(dispatch, ownProps) {
  return {
    delete: (schema) => dispatch(action(
      client,
      schema,
      ['todos', 'delete'],
      { id: ownProps.match.params.id },
    )),
    read: (schema) => dispatch(action(
      client,
      schema,
      ['todos', 'read'],
      { id: ownProps.match.params.id },
    )),
    redirect: () => dispatch(push('/todos')),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Delete)
