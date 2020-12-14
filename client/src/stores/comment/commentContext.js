import {createContext} from 'react';

const CommentContext = createContext();

export const CommentProvider = CommentContext.Provider;

export default CommentContext;