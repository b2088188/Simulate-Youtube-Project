import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CommentStateContext = createContext();
const CommentActionContext = createContext();
CommentStateContext.displayName = 'CommentStateContext';
CommentActionContext.displayName = 'CommentActionContext';
export const CommentStateProvider = CommentStateContext.Provider;
export const CommentActionProvider = CommentActionContext.Provider;
/* eslint-disable */
const useCommentState = useContextFactory('CommentStateContext', CommentStateContext);
const useCommentActions = useContextFactory('CommentActionContext', CommentActionContext);
const useComment = () => [useCommentState(), useCommentActions()];
export default useComment;
