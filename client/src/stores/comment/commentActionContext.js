import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const CommentActionContext = createContext();
CommentActionContext.displayName = 'CommentActionContext';

export const CommentActionProvider = CommentActionContext.Provider;

/* eslint-disable */
export const useCommentActions = useContextFactory('CommentActionContext', CommentActionContext);

export default CommentActionContext;