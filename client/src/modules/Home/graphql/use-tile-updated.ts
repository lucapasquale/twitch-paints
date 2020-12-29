import { gql, useSubscription } from '@apollo/client'
import { TileUpdatedSubscription } from '../../../helpers/graphql/generated'

const QUERY = gql`
  subscription TileUpdated {
    tileUpdated {
      id
      x
      y
      color
    }
  }
`

export const useTileUpdatedSubscription = () => useSubscription<TileUpdatedSubscription>(QUERY)
