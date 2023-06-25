import { ApolloClient, HttpLink, from } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from '../utils/accessTokenManager';
import cache from './cache';


const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = getAccessToken();
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: token } : {}),
      },
    };
  } else {
    return {
      headers,
    };
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: "include",
  cache
});

export default client;