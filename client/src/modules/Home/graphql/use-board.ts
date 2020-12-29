import { gql, useQuery } from '@apollo/client'
import { GetBoardQuery } from '../../../helpers/graphql/generated'

const QUERY = gql`
  query GetBoard {
    board {
      id
      x
      y
      color
    }
  }
`

export const useBoardQuery = () => useQuery<GetBoardQuery>(QUERY)
