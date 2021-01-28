import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const SubscribeStateContext = createContext();
const SubscribeActionContext = createContext();
SubscribeStateContext.displayName = 'SubscribeStateContext';
SubscribeActionContext.displayName = 'SubscribeActionContext';
export const SubscribeStateProvider = SubscribeStateContext.Provider;
export const SubscribeActionProvider = SubscribeActionContext.Provider;
/* eslint-disable */
const useSubscribeState = useContextFactory('SubscribeStateContext', SubscribeStateContext);
const useSubscribeActions = useContextFactory('SubscribeActionContext', SubscribeActionContext);
const useSubscribe = () => [useSubscribeState(), useSubscribeActions()];
export default useSubscribe;
