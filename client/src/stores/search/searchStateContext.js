import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const SearchStateContext = createContext();
SearchStateContext.displayName = 'SearchStateContext';

export const SearchStateProvider = SearchStateContext.Provider;

/* eslint-disable */
export const useSearchState = useContextFactory('SearchStateContext', SearchStateContext);

export default SearchStateContext;