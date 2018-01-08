import coreapi from 'coreapi'


export const schema_client = new coreapi.Client({
  headers: {
    'Accept': 'application/coreapi+json',
  }
})


export const client = new coreapi.Client({
  headers: {
    'Accept': 'application/json',
  }
})


export const url = 'http://localhost:8000/schema'
