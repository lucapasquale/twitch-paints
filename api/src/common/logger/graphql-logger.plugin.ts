import { Plugin } from '@nestjs/graphql'
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base'

import { Logger } from '.'

@Plugin()
export class GraphqlLoggingPlugin implements ApolloServerPlugin {
  constructor(private logger: Logger) {
    this.logger.setContext('GraphQL')
  }

  requestDidStart(): GraphQLRequestListener {
    const logger = this.logger

    const now = Date.now()

    return {
      didResolveOperation({ request: { query, operationName } }) {
        if (operationName === 'IntrospectionQuery') {
          return
        }

        logger.log({
          msg: 'GraphQL Request',
          query: operationName || query,
        })
      },

      willSendResponse({ response, request: { query, operationName } }) {
        if (operationName === 'IntrospectionQuery') {
          return
        }

        if (response.errors && response.errors.length) {
          logger.error({
            msg: 'GraphQL Error',
            query: operationName || query,
            errors: response.errors,
            executionTime: Date.now() - now,
          })
          return
        }

        logger.log({
          msg: 'GraphQL Response',
          query: operationName || query,
          executionTime: Date.now() - now,
        })
      },
    }
  }
}
