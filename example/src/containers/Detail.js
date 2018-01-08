import { connect } from 'react-redux'
import { action } from 'redux-coreapi'

import { client } from '../api'
import Detail from '../components/Detail'


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
    read: (schema) => dispatch(action(
      client,
      schema,
      ['todos', 'read'],
      { id: ownProps.match.params.id },
    )),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail)
