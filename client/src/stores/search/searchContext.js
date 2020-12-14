import {createContext} from 'react';

const SearchContext = createContext();

export const SearchProvider = SearchContext.Provider;

export default SearchContext;