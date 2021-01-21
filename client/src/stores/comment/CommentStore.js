import React, { useMemo, useCallback } from 'react';
import { CommentStateProvider } from './commentStateContext';
import { CommentActionProvider } from './commentActionContext';
import commentsReducer from './commentsReducer';
import useAsync from '../../customhooks/useAsync';
import { GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../types';
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
         const { status } = await fetchComments(
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/videos/${videoId}/comments`)
         );
         if (status === 'success')
            dispatchComments({
               type: GET_COMMENTS
            });
      },
      [fetchComments, dispatchComments]
   );

   const createComment = useCallback(
      async function (videoId, values) {
         const { status } = await fetchComments(
            axios.post(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/videos/${videoId}/comments`,
               values
            )
         );
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
            axios.patch(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/videos/${videoId}/comments/${commentId}`,
               values
            )
         );
         if (status === 'success') dispatchComments({ type: UPDATE_COMMENT });
      },
      [fetchComments, dispatchComments]
   );

   const deleteComment = useCallback(
      async function (videoId, commentId) {
         await fetchComments(
            axios.delete(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/videos/${videoId}/comments/${commentId}`
            )
         );
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
