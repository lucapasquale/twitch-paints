import { useMemo } from 'react'
import { NextPageContext } from 'next'
import { ApolloClient, InMemoryCache, split, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { config } from '../../config'

let apolloClient: ApolloClient<NormalizedCacheObject>

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export function createApolloClient(_?: any, __?: NextPageContext) {
  const wsLink = (process as any).browser
    ? new WebSocketLink({
        uri: `${config.SUBSCRIPTIONS_URL}/graphql`,
        options: { reconnect: true },
      })
    : null

  const httpLink = new HttpLink({
    uri: `${config.API_URL}/graphql`,
  })

  const link = (process as any).browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  const cache = new InMemoryCache({
    addTypename: true,
  })

  return new ApolloClient({ cache, link })
}

function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
