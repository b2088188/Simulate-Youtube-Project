import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const LikeStateContext = createContext();
const LikeActionContext = createContext();
LikeStateContext.displayName = 'LikeStateContext';
LikeActionContext.displayName = 'LikeActionContext';
export const LikeStateProvider = LikeStateContext.Provider;
export const LikeActionProvider = LikeActionContext.Provider;
/* eslint-disable */
const useLikeState = useContextFactory('LikeStateContext', LikeStateContext);
const useLikeActions = useContextFactory('LikeActionContext', LikeActionContext);
const useLike = () => [useLikeState(), useLikeActions()];
export default useLike;
