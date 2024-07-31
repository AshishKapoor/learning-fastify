const fastify = require('fastify')({ logger: true })

const PORT = process.env.PORT || 8000;

// Swagger configuration
fastify.register(require('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://0.0.0.0:8000',
        description: 'Development server'
      }
    ],
  }
})

// Swagger UI configuration
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true
  },
  uiHooks: {
    onRequest: function(request, reply, next) { next() },
    preHandler: function(request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

fastify.register(require('./routes/items'))

const start = () => {
  fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}
start()

