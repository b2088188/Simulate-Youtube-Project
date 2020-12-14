import {createContext} from 'react';

const LikeContext = createContext();

export const LikeProvider = LikeContext.Provider;

export default LikeContext;