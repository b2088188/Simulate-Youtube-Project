import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CommentStateContext = createContext();
CommentStateContext.displayName = 'CommentStateContext';

export const CommentStateProvider = CommentStateContext.Provider;

/* eslint-disable */
export const useCommentState = useContextFactory('CommentStateContext', CommentStateContext);

export default CommentStateContext;
