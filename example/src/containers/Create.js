import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { action } from 'redux-coreapi'

import { client } from '../api'
import Create from '../components/Create'


function mapStateToProps({ schema }) {
  return { schema: schema.schema }
}


function mapDispatchToProps(dispatch) {
  return {
    create: (schema, description) => {
      return dispatch(action(
        client,
        schema,
        ['todos', 'create'],
        { description }
      ))
    },
    redirect: id => dispatch(push(`/todos/${id}`)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create)
