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

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: string | null };


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