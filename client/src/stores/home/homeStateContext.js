import { createContext } from "react";
import useContextFactory from "../../customhooks/useContextFactory";

const HomeStateContext = createContext();
HomeStateContext.displayName = "HomeStateContext";

export const HomeStateProvider = HomeStateContext.Provider;

/* eslint-disable */
export const useHomeState = useContextFactory(
  "HomeStateContext",
  HomeStateContext
);

export default HomeStateContext;