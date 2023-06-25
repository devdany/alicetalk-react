import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  /**  Chat의 id */
  id: Scalars['ID']['output'];
  /**  Chat의 구성원 목록 */
  members: Array<User>;
  /**  Chat의 메시지 목록 */
  messages: Array<Message>;
};

export type Message = {
  __typename?: 'Message';
  /**  Message의 내용 */
  body: Scalars['String']['output'];
  /**  Message가 속한 Chat */
  chat?: Maybe<Chat>;
  /**  Message의 전송 시각 */
  createdAt: Scalars['DateTime']['output'];
  /**  Message의 id */
  id: Scalars['ID']['output'];
  /**  Message의 전송자 */
  sender?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * * Chat을 생성합니다.
   * * @param memberIds: Chat의 구성원 id 목록
   * * @return the Chat Schema
   */
  createChat?: Maybe<Chat>;
  /**
   * * Chat에 구성원을 초대합니다.
   * * @param chatId: Chat의 id
   * * @param memberIds: 추가할 구성원 id 목록
   * * @return the Chat Schema
   */
  inviteToChat?: Maybe<Chat>;
  /**
   * * Chat을 나갑니다.
   * * @param chatId: 나갈 Chat의 id
   * * @return the Chat Schema
   */
  leaveChat?: Maybe<Chat>;
  /**
   * * Chat에 Message를 전송합니다.
   * * @param chatId: 메시지를 전송할 Chat의 id
   * * @param body: 메시지 내용
   * * @return the Message Schema
   */
  sendMessage?: Maybe<Message>;
};


export type MutationCreateChatArgs = {
  memberIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationInviteToChatArgs = {
  chatId: Scalars['ID']['input'];
  memberIds: Array<Scalars['ID']['input']>;
};


export type MutationLeaveChatArgs = {
  chatId: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  body: Scalars['String']['input'];
  chatId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * * 특정 Chat을 조회합니다.
   * * @param id: Chat의 id
   * * @return the Chat Schema
   */
  chat?: Maybe<Chat>;
  /**
   * * 유저 인증 정보로 로그인합니다.
   * * @param email: 유저 이메일
   * * @param password: 유저 비밀번호
   * * @return 인증 토큰
   */
  login?: Maybe<Scalars['String']['output']>;
  /**
   * * Authorization 헤더의 토큰의 소유자를 조회합니다.
   * * @return the user object
   */
  me?: Maybe<User>;
  /**
   * * 특정 User 조회합니다.
   * * @param id: User의 id
   * * @return the User Schema
   */
  user?: Maybe<User>;
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent?: Maybe<Message>;
};

export type User = {
  __typename?: 'User';
  /**  User가 구성원으로 있는 Chat 목록 */
  chats: Array<Chat>;
  /**  User의 email */
  email: Scalars['String']['output'];
  /**  User의 id */
  id: Scalars['ID']['output'];
};

export type ChatQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', id: string, email: string }>, messages: Array<{ __typename?: 'Message', id: string, body: string, createdAt: any, sender?: { __typename?: 'User', id: string, email: string } | null }> } | null };

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, sender?: { __typename?: 'User', id: string, email: string } | null } | null };

export type ChatItemQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type ChatItemQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', id: string, email: string }>, messages: Array<{ __typename?: 'Message', id: string, body: string, createdAt: any }> } | null };

export type CreateChatMutationVariables = Exact<{
  memberIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat?: { __typename?: 'Chat', id: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, chats: Array<{ __typename?: 'Chat', id: string }> } | null };

export type NewChatFragment = { __typename?: 'Chat', id: string };

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: string | null };

export const NewChatFragmentDoc = gql`
    fragment NewChat on Chat {
  id
}
    `;
export const ChatDocument = gql`
    query chat($chatId: ID!) {
  chat(id: $chatId) {
    id
    members {
      id
      email
    }
    messages {
      id
      sender {
        id
        email
      }
      body
      createdAt
    }
  }
}
    `;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($chatId: ID!, $body: String!) {
  sendMessage(chatId: $chatId, body: $body) {
    id
    sender {
      id
      email
    }
    body
    createdAt
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const ChatItemDocument = gql`
    query chatItem($chatId: ID!) {
  chat(id: $chatId) {
    id
    members {
      id
      email
    }
    messages {
      id
      body
      createdAt
    }
  }
}
    `;

/**
 * __useChatItemQuery__
 *
 * To run a query within a React component, call `useChatItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatItemQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatItemQuery(baseOptions: Apollo.QueryHookOptions<ChatItemQuery, ChatItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatItemQuery, ChatItemQueryVariables>(ChatItemDocument, options);
      }
export function useChatItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatItemQuery, ChatItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatItemQuery, ChatItemQueryVariables>(ChatItemDocument, options);
        }
export type ChatItemQueryHookResult = ReturnType<typeof useChatItemQuery>;
export type ChatItemLazyQueryHookResult = ReturnType<typeof useChatItemLazyQuery>;
export type ChatItemQueryResult = Apollo.QueryResult<ChatItemQuery, ChatItemQueryVariables>;
export const CreateChatDocument = gql`
    mutation createChat($memberIds: [ID!]) {
  createChat(memberIds: $memberIds) {
    id
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      memberIds: // value for 'memberIds'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    chats {
      id
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;