import * as R from 'ramda';
import React, { useReducer, useMemo, useCallback } from 'react';
import { LikeStateProvider } from './likeStateContext';
import { LikeActionProvider } from './likeActionContext';
import likeReducer from './likeReducer';
import useAsync from '../../customhooks/useAsync';
import { CREATE_USERLIKE, GET_USERLIKES, GET_CURRENTLIKE, DELETE_USERLIKE } from '../types';
import axios from 'axios';

const LikeStore = ({ children }) => {
   const [stateUserLikes, fetchUserLikes, dispatchUserLikes] = useAsync(
      {
         userLikes: [],
         currentUserLike: null
      },
      likeReducer
   );

   const getUserLikes = useCallback(
      async function (action, userId) {
         const { status } = await fetchUserLikes(axios.get(`/api/v1/users/${userId}/likes`));
         if (status === 'success') dispatchUserLikes({ type: GET_USERLIKES });
      },
      [fetchUserLikes, dispatchUserLikes]
   );

   const getCurrentLike = useCallback(
      async function (userId, videoId) {
         const { status } = await fetchUserLikes(
            axios.get(`/api/v1/users/${userId}/likes/${videoId}`)
         );
         if (status === 'success') dispatchUserLikes({ type: GET_CURRENTLIKE });
      },
      [fetchUserLikes, dispatchUserLikes]
   );

   const createLike = useCallback(
      async function (userId, video) {
         const { status } = await fetchUserLikes(
            axios.post(`/api/v1/users/${userId}/likes`, {
               videoId: video.videoId,
               title: video.title,
               channelTitle: video.channel.title,
               image: video.images,
               publishedAt: video.publishedAt
            })
         );
         if (status === 'success') dispatchUserLikes({ type: CREATE_USERLIKE });
      },
      [fetchUserLikes, dispatchUserLikes]
   );

   const deleteLike = useCallback(
      async function (videoId) {
         await fetchUserLikes(axios.delete(`/api/v1/likes/${videoId}`));
         dispatchUserLikes({ type: DELETE_USERLIKE, payload: { videoId } });
      },
      [fetchUserLikes, dispatchUserLikes]
   );

   const value = useMemo(
      () => ({
         userLikes: stateUserLikes.userLikes,
         currentUserLike: stateUserLikes.currentUserLike,
         statusUserLikes: stateUserLikes.status,
         errorUserLikes: stateUserLikes.error
      }),
      [stateUserLikes]
   );

   const actions = useMemo(
      () => ({
         getUserLikes,
         getCurrentLike,
         createLike,
         deleteLike
      }),
      [getUserLikes, getCurrentLike, createLike, deleteLike]
   );

   return (
      <LikeStateProvider value={value}>
         <LikeActionProvider value={actions}>{children}</LikeActionProvider>
      </LikeStateProvider>
   );
};

export default LikeStore;
