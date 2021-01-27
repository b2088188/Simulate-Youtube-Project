import React, { useMemo, useCallback } from 'react';
import { CommentStateProvider, CommentActionProvider } from './commentContext';
import commentsReducer from './commentsReducer';
import useAsync from '../../customhooks/useAsync';
import { GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../types';
import { videoRequest } from '../../apis/backend';

const CommentStore = ({ children }) => {
   const [stateComments, fetchComments, dispatchComments] = useAsync(
      {
         comments: []
      },
      commentsReducer
   );

   const getVideoComments = useCallback(
      async function (videoId) {
         const { status } = await fetchComments(videoRequest.get(`/${videoId}/comments`));
         if (status === 'success')
            dispatchComments({
               type: GET_COMMENTS
            });
      },
      [fetchComments, dispatchComments]
   );

   const createComment = useCallback(
      async function (videoId, values) {
         const { status } = await fetchComments(videoRequest.post(`/${videoId}/comments`, values));
         if (status === 'success')
            dispatchComments({
               type: ADD_COMMENT
            });
      },
      [fetchComments, dispatchComments]
   );

   const updateComment = useCallback(
      async function (videoId, commentId, values) {
         const { status } = await fetchComments(
            videoRequest.patch(`/${videoId}/comments/${commentId}`, values)
         );
         if (status === 'success') dispatchComments({ type: UPDATE_COMMENT });
      },
      [fetchComments, dispatchComments]
   );

   const deleteComment = useCallback(
      async function (videoId, commentId) {
         await fetchComments(videoRequest.delete(`/${videoId}/comments/${commentId}`));
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
