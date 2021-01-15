import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const HomeActionContext = createContext();
HomeActionContext.displayName = 'HomeActionContext';

export const HomeActionProvider = HomeActionContext.Provider;

/* eslint-disable */
export const useHomeActions = useContextFactory('HomeActionContext', HomeActionContext);

export default HomeActionContext;
