import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const SearchActionContext = createContext();
SearchActionContext.displayName = 'SearchActionContext';

export const SearchActionProvider = SearchActionContext.Provider;

/* eslint-disable */
export const useSearchActions = useContextFactory('SearchActionContext', SearchActionContext);

export default SearchActionContext;
