import { InMemoryCache, gql, makeVar } from "@apollo/client";

export const accessTokenVar = makeVar<string | null>(null);

const cache = new InMemoryCache();

export default cache;