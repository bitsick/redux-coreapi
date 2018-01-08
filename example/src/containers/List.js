import { connect } from 'react-redux'
import { action } from 'redux-coreapi'

import { client } from '../api'
import List from '../components/List'


function mapStateToProps({ schema, todos }) {
  const { data, error, index, loading } = todos
  return {
    error,
    loading,
    schema: schema.schema,
    todos: index.map(id => data[id].instance),
  }
}


function mapDispatchToProps(dispatch) {
  return {
    list: (schema) => dispatch(action(client, schema, ['todos', 'list'])),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)
