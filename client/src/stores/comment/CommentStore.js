import React, { useReducer, useMemo, useCallback } from 'react';
import { CommentStateProvider } from './commentStateContext';
import { CommentActionProvider } from './commentActionContext';
import commentReducer from './commentReducer';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';

const CommentStore = ({ children }) => {
   const [stateComments, fetchComments] = useAsync({
      data: [],
   });
   const [stateComment, fetchComment] = useAsync({
      data: {},
   });

   const getVideoComments = useCallback(
      async function (videoId) {
         fetchComments(axios.get(`/api/v1/videos/${videoId}/comments`));
      },
      [fetchComments]
   );

   const createComment = useCallback(
      async function (videoId, values) {
         fetchComment(axios.post(`/api/v1/videos/${videoId}/comments`, values));
      },
      [fetchComment]
   );

   const updateComment = useCallback(
      async function (videoId, commentId, values) {
         fetchComment(
            axios.patch(
               `/api/v1/videos/${videoId}/comments/${commentId}`,
               values
            )
         );
      },
      [fetchComment]
   );

   const deleteComment = useCallback(
      async function (videoId, commentId) {
         fetchComment(
            axios.delete(`/api/v1/videos/${videoId}/comments/${commentId}`)
         );
      },
      [fetchComment]
   );

   const value = useMemo(
      () => ({
         comments: stateComments.data.comments,
         statusComments: stateComments.status,
         errorComments: stateComments.error,
         statusComment: stateComment.status,
      }),
      [stateComments, stateComment]
   );

   const actions = useMemo(
      () => ({
         fetchComments,
         getVideoComments,
         createComment,
         updateComment,
         deleteComment,
      }),
      [
         fetchComments,
         getVideoComments,
         createComment,
         updateComment,
         deleteComment,
      ]
   );

   return (
      <CommentStateProvider value={value}>
         <CommentActionProvider value={actions}>
            {children}
         </CommentActionProvider>
      </CommentStateProvider>
   );
};

export default CommentStore;
