const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/item')

const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
}

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItems
}

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem
}

const postItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      }
    },
    response: {
      201: Item,
    },
  },
  handler: createItem,
}

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: deleteItem,
}

const updateItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      }
    },
    response: {
      200: Item,
    },
  },
  handler: updateItem,
}

function itemRoutes(fastify, options, done) {
  // List
  fastify.get('/items', getItemsOpts)

  // Retreive
  fastify.get('/items/:id', getItemOpts)

  // Create
  fastify.post('/items', postItemOpts)

  // Destroy
  fastify.delete('/items/:id', deleteItemOpts)

  // Update
  fastify.put('/items/:id', updateItemOpts)

  done()
}

module.exports = itemRoutes
