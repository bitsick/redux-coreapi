/* eslint-disable quotes, no-console */
import coreapi from 'coreapi'


const codec = new coreapi.codecs.CoreJSONCodec()


export const document = codec.decode({
  _type: 'document',
  _meta: {
    title: 'Example API',
    url: 'http://example.com/api/v1/docs/schema.js'
  },
  objects: {
    list: {
      _type: 'link',
      url: '/api/v1/objects/',
      action: 'get',
      fields: [
        {
          name: 'limit',
          location: 'query',
          schema: {
            _type: 'integer',
            title: 'Limit',
            description: 'Number of results to return per page.'
          }
        },
        {
          name: 'offset',
          location: 'query',
          schema: {
            _type: 'integer',
            title: 'Offset',
            description: 'The initial index from which to return the results.'
          }
        }
      ]
    },
    create: {
      _type: 'link',
      url: '/api/v1/objects/',
      action: 'post',
      encoding: 'application/json',
      fields: [
        {
          name: 'name',
          required: true,
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Name',
            description: 'The name of the object.'
          }
        },
        {
          name: 'notes',
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Notes',
            description: 'Optional additional notes for the object.'
          }
        },
      ]
    },
    read: {
      _type: 'link',
      url: '/api/v1/objects/{id}/',
      action: 'get',
      fields: [
        {
          name: 'id',
          required: true,
          location: 'path',
          schema: {
            _type: 'integer',
            title: 'ID',
            description: 'A unique integer value identifying this object.'
          }
        }
      ]
    },
    update: {
      _type: 'link',
      url: '/api/v1/objects/{id}/',
      action: 'put',
      encoding: 'application/json',
      fields: [
        {
          name: 'id',
          required: true,
          location: 'path',
          schema: {
            _type: 'integer',
            title: 'ID',
            description: 'A unique integer value identifying this object.'
          }
        },
        {
          name: 'name',
          required: true,
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Name',
            description: 'The name of the object.'
          }
        },
        {
          name: 'notes',
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Notes',
            description: 'Optional additional notes for the object.'
          }
        }
      ]
    },
    partial_update: {
      _type: 'link',
      url: '/api/v1/objects/{id}/',
      action: 'patch',
      encoding: 'application/json',
      fields: [
        {
          name: 'id',
          required: true,
          location: 'path',
          schema: {
            _type: 'integer',
            title: 'ID',
            description: 'A unique integer value identifying this object.'
          }
        },
        {
          name: 'name',
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Name',
            description: 'The name of the object.'
          }
        },
        {
          name: 'notes',
          location: 'form',
          schema: {
            _type: 'string',
            title: 'Notes',
            description: 'Optional additional notes for the object.'
          }
        }
      ]
    },
    'delete': {
      _type: 'link',
      url: '/api/v1/objects/{id}/',
      action: 'delete',
      fields: [
        {
          name: 'id',
          required: true,
          location: 'path',
          schema: {
            _type: 'integer',
            title: 'ID',
            description: 'A unique integer value identifying this object.'
          }
        }
      ]
    }
  }
}, { preloaded: true })


export const transport = new coreapi.transports.HTTPTransport({
  // eslint-disable-next-line no-unused-vars
  fetch: (url, options) => new Promise((fetchResolve, fetchReject) => {
    fetchResolve({
      url,
      ok: true,
      status: 200,
      statusText: 'ok',
      headers: {
        get: header => {
          switch(header.toLowerCase()) {
          case 'content-length':
            return 4
          case 'content-type':
            return 'application/json'
          default:
            return ''
          }
        }
      },
      text: () => {
        // eslint-disable-next-line no-unused-vars
        return new Promise((textResolve, textReject) => {
          textResolve('true')
        })
      }
    })
  })
})


export const requestErrorTransport = new coreapi.transports.HTTPTransport({
  // eslint-disable-next-line no-unused-vars
  fetch: (url, options) => new Promise((fetchResolve, fetchReject) => {
    fetchReject(Error('Failure'))
  })
})


export const responseErrorTransport = new coreapi.transports.HTTPTransport({
  // eslint-disable-next-line no-unused-vars
  fetch: (url, options) => new Promise((fetchResolve, fetchReject) => {
    fetchResolve({
      url,
      ok: false,
      status: 400,
      statusText: 'bad request',
      headers: {
        get: header => {
          switch(header.toLowerCase()) {
          case 'content-length':
            return 5
          case 'content-type':
            return 'application/json'
          default:
            return ''
          }
        }
      },
      text: () => {
        // eslint-disable-next-line no-unused-vars
        return new Promise((textResolve, textReject) => {
          textResolve('false')
        })
      }
    })
  })
})


export const client = new coreapi.Client({
  transports: [transport]
})


export const requestErrorClient = new coreapi.Client({
  transports: [requestErrorTransport]
})


export const responseErrorClient = new coreapi.Client({
  transports: [responseErrorTransport]
})
