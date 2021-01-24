import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const HomeStateContext = createContext();
const HomeActionContext = createContext();
HomeStateContext.displayName = 'HomeStateContext';
HomeActionContext.displayName = 'HomeActionContext';
export const HomeStateProvider = HomeStateContext.Provider;
export const HomeActionProvider = HomeActionContext.Provider;
/* eslint-disable */
const useHomeState = useContextFactory('HomeStateContext', HomeStateContext);
const useHomeActions = useContextFactory('HomeActionContext', HomeActionContext);
const useHome = () => [useHomeState(), useHomeActions()];
export default useHome;
