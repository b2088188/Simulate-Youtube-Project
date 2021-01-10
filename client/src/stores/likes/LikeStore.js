import * as R from 'ramda';
import React, { useReducer, useMemo, useCallback } from 'react';
import { LikeStateProvider } from './likeStateContext';
import { LikeActionProvider } from './likeActionContext';
import likeReducer from './likeReducer';
import axios from 'axios';
import useAsync from '../../customhooks/useAsync';

const LikeStore = ({ children }) => {
   const [stateUserLikes, fetchUserLikes] = useAsync({
      data: [],
   });

   const [stateCurrentLike, fetchCurrentLike] = useAsync({
      data: {},
   });

   const getUserLikes = useCallback(
      async function (action, userId) {
         fetchUserLikes(axios.get(`/api/v1/users/${userId}/likes`));
      },
      [fetchUserLikes]
   );

   const getCurrentLike = useCallback(
      async function (userId, videoId) {
         fetchCurrentLike(
            axios.get(`/api/v1/users/${userId}/likes/${videoId}`)
         );
      },
      [fetchCurrentLike]
   );

   const deleteLike = useCallback(
      async function (userId, videoId) {
         fetchCurrentLike(
            axios.delete(`/api/v1/users/${userId}/likes/${videoId}`)
         );
      },
      [fetchCurrentLike]
   );

   const createLike = useCallback(
      async function (userId, video) {
         fetchCurrentLike(
            axios.post(`/api/v1/users/${userId}/likes`, {
               videoId: video.videoId,
               title: video.title,
               channelId: video.channel.channelId,
               channelTitle: video.channel.title,
               image: video.images,
               publishedAt: video.publishedAt,
            })
         );
      },
      [fetchCurrentLike]
   );

   const value = useMemo(
      () => ({
         userLikes: stateUserLikes.data.likes,
         statusUserLikes: stateUserLikes.status,
         errorUserLikes: stateUserLikes.error,
         currentLike: stateCurrentLike.data.like,
         statusCurrentLike: stateCurrentLike.status,
         errorCurrentLike: stateCurrentLike.error,
      }),
      [stateUserLikes, stateCurrentLike]
   );

   const actions = useMemo(
      () => ({
         getUserLikes,
         getCurrentLike,
         createLike,
         deleteLike,
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
