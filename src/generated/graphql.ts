import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://alexd.uk/site/wordle/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json","Accept":"application/json"},"credentials":"include"}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GameInput = {
  date: Scalars['String'];
  finished: Scalars['Boolean'];
  guesses: Array<Scalars['String']>;
  solution: Scalars['String'];
  statsId: Scalars['ID'];
  username: Scalars['String'];
};

export type GameState = {
  __typename?: 'GameState';
  _siteQuery: Scalars['String'];
  _siteValidTime: Scalars['String'];
  date: Scalars['String'];
  finished: Scalars['Boolean'];
  guesses?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  solution: Scalars['String'];
  stats?: Maybe<Stats>;
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveGame?: Maybe<GameState>;
  saveStats?: Maybe<Stats>;
};


export type MutationSaveGameArgs = {
  game: GameInput;
  id: Scalars['ID'];
};


export type MutationSaveStatsArgs = {
  id: Scalars['ID'];
  stats: StatsInput;
};

export type Query = {
  __typename?: 'Query';
  allGames?: Maybe<Array<Maybe<GameState>>>;
  allStats?: Maybe<Array<Maybe<Stats>>>;
  gameForId?: Maybe<GameState>;
  gameHistoryForId?: Maybe<Array<Maybe<GameState>>>;
  playersGames?: Maybe<Array<Maybe<GameState>>>;
  todaysGames?: Maybe<Array<Maybe<GameState>>>;
};


export type QueryGameForIdArgs = {
  id: Scalars['ID'];
};


export type QueryGameHistoryForIdArgs = {
  id: Scalars['ID'];
};


export type QueryPlayersGamesArgs = {
  username: Scalars['String'];
};


export type QueryTodaysGamesArgs = {
  date: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  bestStreak: Scalars['Int'];
  currentStreak: Scalars['Int'];
  game?: Maybe<GameState>;
  gamesFailed: Scalars['Int'];
  id: Scalars['ID'];
  successRate: Scalars['Float'];
  totalGames: Scalars['Int'];
  username: Scalars['String'];
  winDistribution: Array<Scalars['Int']>;
};

export type StatsInput = {
  bestStreak: Scalars['Int'];
  currentStreak: Scalars['Int'];
  gamesFailed: Scalars['Int'];
  successRate: Scalars['Float'];
  totalGames: Scalars['Int'];
  username: Scalars['String'];
  winDistribution: Array<Scalars['Int']>;
};

export type AllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGamesQuery = { __typename?: 'Query', allGames?: Array<{ __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined } | null | undefined> | null | undefined };

export type AllStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStatsQuery = { __typename?: 'Query', allStats?: Array<{ __typename?: 'Stats', currentStreak: number, bestStreak: number, gamesFailed: number, successRate: number, totalGames: number, username: string, winDistribution: Array<number>, game?: { __typename?: 'GameState', date: string, finished: boolean } | null | undefined } | null | undefined> | null | undefined };

export type SaveGameMutationVariables = Exact<{
  id: Scalars['ID'];
  game: GameInput;
}>;


export type SaveGameMutation = { __typename?: 'Mutation', saveGame?: { __typename?: 'GameState', id: string } | null | undefined };

export type GameFieldsFragment = { __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined };

export type GameForIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GameForIdQuery = { __typename?: 'Query', gameForId?: { __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined } | null | undefined };

export type GameHistoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GameHistoryQuery = { __typename?: 'Query', gameHistoryForId?: Array<{ __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined } | null | undefined> | null | undefined };

export type PlayersGamesQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type PlayersGamesQuery = { __typename?: 'Query', playersGames?: Array<{ __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined } | null | undefined> | null | undefined };

export type UpdateStatsMutationVariables = Exact<{
  stats: StatsInput;
  id: Scalars['ID'];
}>;


export type UpdateStatsMutation = { __typename?: 'Mutation', saveStats?: { __typename?: 'Stats', id: string } | null | undefined };

export type StatsFieldsFragment = { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number };

export type TodaysGamesQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type TodaysGamesQuery = { __typename?: 'Query', todaysGames?: Array<{ __typename?: 'GameState', guesses?: Array<string> | null | undefined, date: string, id: string, solution: string, finished: boolean, username: string, stats?: { __typename?: 'Stats', username: string, winDistribution: Array<number>, gamesFailed: number, currentStreak: number, bestStreak: number, totalGames: number, successRate: number } | null | undefined } | null | undefined> | null | undefined };

export const StatsFieldsFragmentDoc = `
    fragment statsFields on Stats {
  username
  winDistribution
  gamesFailed
  currentStreak
  bestStreak
  totalGames
  successRate
}
    `;
export const GameFieldsFragmentDoc = `
    fragment gameFields on GameState {
  guesses
  date
  id
  solution
  finished
  username
  stats {
    ...statsFields
  }
}
    ${StatsFieldsFragmentDoc}`;
export const AllGamesDocument = `
    query allGames {
  allGames {
    ...gameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export const useAllGamesQuery = <
      TData = AllGamesQuery,
      TError = Error
    >(
      variables?: AllGamesQueryVariables,
      options?: UseQueryOptions<AllGamesQuery, TError, TData>
    ) =>
    useQuery<AllGamesQuery, TError, TData>(
      variables === undefined ? ['allGames'] : ['allGames', variables],
      fetcher<AllGamesQuery, AllGamesQueryVariables>(AllGamesDocument, variables),
      options
    );
useAllGamesQuery.document = AllGamesDocument;


useAllGamesQuery.getKey = (variables?: AllGamesQueryVariables) => variables === undefined ? ['allGames'] : ['allGames', variables];
;

useAllGamesQuery.fetcher = (variables?: AllGamesQueryVariables) => fetcher<AllGamesQuery, AllGamesQueryVariables>(AllGamesDocument, variables);
export const AllStatsDocument = `
    query allStats {
  allStats {
    currentStreak
    bestStreak
    game {
      date
      finished
    }
    gamesFailed
    successRate
    totalGames
    username
    winDistribution
  }
}
    `;
export const useAllStatsQuery = <
      TData = AllStatsQuery,
      TError = Error
    >(
      variables?: AllStatsQueryVariables,
      options?: UseQueryOptions<AllStatsQuery, TError, TData>
    ) =>
    useQuery<AllStatsQuery, TError, TData>(
      variables === undefined ? ['allStats'] : ['allStats', variables],
      fetcher<AllStatsQuery, AllStatsQueryVariables>(AllStatsDocument, variables),
      options
    );
useAllStatsQuery.document = AllStatsDocument;


useAllStatsQuery.getKey = (variables?: AllStatsQueryVariables) => variables === undefined ? ['allStats'] : ['allStats', variables];
;

useAllStatsQuery.fetcher = (variables?: AllStatsQueryVariables) => fetcher<AllStatsQuery, AllStatsQueryVariables>(AllStatsDocument, variables);
export const SaveGameDocument = `
    mutation saveGame($id: ID!, $game: GameInput!) {
  saveGame(id: $id, game: $game) {
    id
  }
}
    `;
export const useSaveGameMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<SaveGameMutation, TError, SaveGameMutationVariables, TContext>) =>
    useMutation<SaveGameMutation, TError, SaveGameMutationVariables, TContext>(
      'saveGame',
      (variables?: SaveGameMutationVariables) => fetcher<SaveGameMutation, SaveGameMutationVariables>(SaveGameDocument, variables)(),
      options
    );
useSaveGameMutation.fetcher = (variables: SaveGameMutationVariables) => fetcher<SaveGameMutation, SaveGameMutationVariables>(SaveGameDocument, variables);
export const GameForIdDocument = `
    query gameForId($id: ID!) {
  gameForId(id: $id) {
    ...gameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export const useGameForIdQuery = <
      TData = GameForIdQuery,
      TError = Error
    >(
      variables: GameForIdQueryVariables,
      options?: UseQueryOptions<GameForIdQuery, TError, TData>
    ) =>
    useQuery<GameForIdQuery, TError, TData>(
      ['gameForId', variables],
      fetcher<GameForIdQuery, GameForIdQueryVariables>(GameForIdDocument, variables),
      options
    );
useGameForIdQuery.document = GameForIdDocument;


useGameForIdQuery.getKey = (variables: GameForIdQueryVariables) => ['gameForId', variables];
;

useGameForIdQuery.fetcher = (variables: GameForIdQueryVariables) => fetcher<GameForIdQuery, GameForIdQueryVariables>(GameForIdDocument, variables);
export const GameHistoryDocument = `
    query gameHistory($id: ID!) {
  gameHistoryForId(id: $id) {
    ...gameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export const useGameHistoryQuery = <
      TData = GameHistoryQuery,
      TError = Error
    >(
      variables: GameHistoryQueryVariables,
      options?: UseQueryOptions<GameHistoryQuery, TError, TData>
    ) =>
    useQuery<GameHistoryQuery, TError, TData>(
      ['gameHistory', variables],
      fetcher<GameHistoryQuery, GameHistoryQueryVariables>(GameHistoryDocument, variables),
      options
    );
useGameHistoryQuery.document = GameHistoryDocument;


useGameHistoryQuery.getKey = (variables: GameHistoryQueryVariables) => ['gameHistory', variables];
;

useGameHistoryQuery.fetcher = (variables: GameHistoryQueryVariables) => fetcher<GameHistoryQuery, GameHistoryQueryVariables>(GameHistoryDocument, variables);
export const PlayersGamesDocument = `
    query playersGames($username: String!) {
  playersGames(username: $username) {
    ...gameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export const usePlayersGamesQuery = <
      TData = PlayersGamesQuery,
      TError = Error
    >(
      variables: PlayersGamesQueryVariables,
      options?: UseQueryOptions<PlayersGamesQuery, TError, TData>
    ) =>
    useQuery<PlayersGamesQuery, TError, TData>(
      ['playersGames', variables],
      fetcher<PlayersGamesQuery, PlayersGamesQueryVariables>(PlayersGamesDocument, variables),
      options
    );
usePlayersGamesQuery.document = PlayersGamesDocument;


usePlayersGamesQuery.getKey = (variables: PlayersGamesQueryVariables) => ['playersGames', variables];
;

usePlayersGamesQuery.fetcher = (variables: PlayersGamesQueryVariables) => fetcher<PlayersGamesQuery, PlayersGamesQueryVariables>(PlayersGamesDocument, variables);
export const UpdateStatsDocument = `
    mutation updateStats($stats: StatsInput!, $id: ID!) {
  saveStats(id: $id, stats: $stats) {
    id
  }
}
    `;
export const useUpdateStatsMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateStatsMutation, TError, UpdateStatsMutationVariables, TContext>) =>
    useMutation<UpdateStatsMutation, TError, UpdateStatsMutationVariables, TContext>(
      'updateStats',
      (variables?: UpdateStatsMutationVariables) => fetcher<UpdateStatsMutation, UpdateStatsMutationVariables>(UpdateStatsDocument, variables)(),
      options
    );
useUpdateStatsMutation.fetcher = (variables: UpdateStatsMutationVariables) => fetcher<UpdateStatsMutation, UpdateStatsMutationVariables>(UpdateStatsDocument, variables);
export const TodaysGamesDocument = `
    query todaysGames($date: String!) {
  todaysGames(date: $date) {
    ...gameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export const useTodaysGamesQuery = <
      TData = TodaysGamesQuery,
      TError = Error
    >(
      variables: TodaysGamesQueryVariables,
      options?: UseQueryOptions<TodaysGamesQuery, TError, TData>
    ) =>
    useQuery<TodaysGamesQuery, TError, TData>(
      ['todaysGames', variables],
      fetcher<TodaysGamesQuery, TodaysGamesQueryVariables>(TodaysGamesDocument, variables),
      options
    );
useTodaysGamesQuery.document = TodaysGamesDocument;


useTodaysGamesQuery.getKey = (variables: TodaysGamesQueryVariables) => ['todaysGames', variables];
;

useTodaysGamesQuery.fetcher = (variables: TodaysGamesQueryVariables) => fetcher<TodaysGamesQuery, TodaysGamesQueryVariables>(TodaysGamesDocument, variables);