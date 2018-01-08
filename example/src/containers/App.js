import { connect } from 'react-redux'
import { get } from 'redux-coreapi'

import { schema_client, url } from '../api'
import App from '../components/App'


function mapStateToProps({ schema  }) {
  return { ...schema }
}


function mapDispatchToProps(dispatch) {
  return {
    get: () => dispatch(get(schema_client, url)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
