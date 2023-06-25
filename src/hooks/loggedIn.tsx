import { useReactiveVar } from "@apollo/client";
import { accessTokenVar } from "../apollo/cache";

export const useLoggedIn = () => {
  return !!useReactiveVar(accessTokenVar);
};
