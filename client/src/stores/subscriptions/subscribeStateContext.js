import { createContext } from "react";
import useContextFactory from "../../customhooks/useContextFactory";

const SubscribeStateContext = createContext();
SubscribeStateContext.displayName = "SubscribeStateContext";

export const SubscribeStateProvider = SubscribeStateContext.Provider;

/* eslint-disable */
export const useSubscribeState = useContextFactory(
  "SubscribeStateContext",
  SubscribeStateContext
);

export default SubscribeStateContext;
