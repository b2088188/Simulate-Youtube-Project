import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const SearchStateContext = createContext();
const SearchActionContext = createContext();
SearchStateContext.displayName = 'SearchStateContext';
SearchActionContext.displayName = 'SearchActionContext';

export const SearchStateProvider = SearchStateContext.Provider;
export const SearchActionProvider = SearchActionContext.Provider;

/* eslint-disable */
const useSearchState = useContextFactory('SearchStateContext', SearchStateContext);
const useSearchActions = useContextFactory('SearchActionContext', SearchActionContext);
const useSearch = () => [useSearchState(), useSearchActions()];
export default useSearch;
