import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const LikeStateContext = createContext();
LikeStateContext.displayName = 'LikeStateContext';

export const LikeStateProvider = LikeStateContext.Provider;

/* eslint-disable */
export const useLikeState = useContextFactory('LikeStateContext', LikeStateContext);

export default LikeStateContext;
