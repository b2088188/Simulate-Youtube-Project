import { createContext } from "react";
import useContextFactory from "../../customhooks/useContextFactory";

const LikeActionContext = createContext();
LikeActionContext.displayName = "LikeActionContext";

export const LikeActionProvider = LikeActionContext.Provider;

/* eslint-disable */
export const useLikeActions = useContextFactory(
  "LikeActionContext",
  LikeActionContext
);

export default LikeActionContext;
