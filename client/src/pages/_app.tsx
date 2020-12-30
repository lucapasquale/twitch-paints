import '../styles.css'
import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import { useApollo } from '../helpers/graphql/apollo-client'

export default function App({ pageProps, Component }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}
