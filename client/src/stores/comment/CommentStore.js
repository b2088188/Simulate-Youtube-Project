import React, { useReducer, useMemo, useCallback } from 'react';
import { CommentStateProvider } from './commentStateContext';
import { CommentActionProvider } from './commentActionContext';
import commentsReducer from './commentsReducer';
import useAsync from '../../customhooks/useAsync';
import {
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';
import axios from 'axios';

const CommentStore = ({ children }) => {
   const [stateComments, fetchComments, dispatchComments] = useAsync(
      {
         comments: []
      },
      commentsReducer
   );

   const getVideoComments = useCallback(
      async function (videoId) {
         const { data, status } = await fetchComments(
            axios.get(`/api/v1/videos/${videoId}/comments`)
         );
         if (status === 'success')
            dispatchComments({
               type: GET_COMMENTS,
               payload: { comments: data.comments }
            });
      },
      [fetchComments, dispatchComments]
   );

   const createComment = useCallback(
      async function (videoId, values) {
         const { data, status } = await fetchComments(
            axios.post(`/api/v1/videos/${videoId}/comments`, values)
         );
         if (status === 'success')
            dispatchComments({
               type: ADD_COMMENT,
               payload: {
                  comment: data.comment
               }
            });
      },
      [fetchComments, dispatchComments]
   );

   const updateComment = useCallback(
      async function (videoId, commentId, values) {
         const { data, status } = await fetchComments(
            axios.patch(`/api/v1/videos/${videoId}/comments/${commentId}`, values)
         );
         if (status === 'success')
            dispatchComments({ type: UPDATE_COMMENT, payload: { comment: data.comment } });
      },
      [fetchComments, dispatchComments]
   );

   const deleteComment = useCallback(
      async function (videoId, commentId) {
         const { status } = fetchComments(
            axios.delete(`/api/v1/videos/${videoId}/comments/${commentId}`)
         );
         if (status === 'success')
            dispatchComments({ type: DELETE_COMMENT, payload: { commentId } });
      },
      [fetchComments, dispatchComments]
   );

   const value = useMemo(
      () => ({
         comments: stateComments.comments,
         statusComments: stateComments.status,
         errorComments: stateComments.error
      }),
      [stateComments]
   );

   const actions = useMemo(
      () => ({
         fetchComments,
         getVideoComments,
         createComment,
         updateComment,
         deleteComment
      }),
      [fetchComments, getVideoComments, createComment, updateComment, deleteComment]
   );

   return (
      <CommentStateProvider value={value}>
         <CommentActionProvider value={actions}>{children}</CommentActionProvider>
      </CommentStateProvider>
   );
};

export default CommentStore;
