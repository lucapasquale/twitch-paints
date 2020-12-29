export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateTile: Tile;
};

export type Query = {
  __typename?: 'Query';
  board: Array<Tile>;
};

export type Subscription = {
  __typename?: 'Subscription';
  tileUpdated: Tile;
};

export type Tile = {
  __typename?: 'Tile';
  color: Scalars['String'];
  id: Scalars['ID'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type GetBoardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardQuery = (
  { __typename?: 'Query' }
  & { board: Array<(
    { __typename?: 'Tile' }
    & Pick<Tile, 'id' | 'x' | 'y' | 'color'>
  )> }
);

export type TileUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TileUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { tileUpdated: (
    { __typename?: 'Tile' }
    & Pick<Tile, 'id' | 'x' | 'y' | 'color'>
  ) }
);
