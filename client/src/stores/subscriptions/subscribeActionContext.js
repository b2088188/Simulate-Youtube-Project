import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const SubscribeActionContext = createContext();
SubscribeActionContext.displayName = 'SubscribeActionContext';

export const SubscribeActionProvider = SubscribeActionContext.Provider;

/* eslint-disable */
export const useSubscribeActions = useContextFactory(
   'SubscribeActionContext',
   SubscribeActionContext
);

export default SubscribeActionContext;
