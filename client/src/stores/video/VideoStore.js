import React, { useMemo, useCallback } from 'react';
import { VideoStateProvider } from './videoStateContext';
import { VideoActionProvider } from './videoActionContext';
import videoReducer from './videoReducer';
import Youtube from '../../apis/youtube';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';
import {
   GET_VIDEO,
   ADD_LIKETOVIDEO,
   DELETE_LIKETOVIDEO,
   ADD_SUBSCRIBETOVIDEO,
   DELETE_SUBSCRIBETOVIDEO
} from '../types';
const VideoStore = ({ children }) => {
   const [stateVideo, fetchVideo, dispatchVideo] = useAsync(
      {
         data: {},
         video: null
      },
      videoReducer
   );

   const getVideoById = useCallback(
      async function (videoId) {
         fetchVideo(axios.get(`/api/v1/videos/${videoId}`));
      },
      [fetchVideo]
   );

   const videoLikeHandle = useCallback(
      function (type) {
         if (type === 'add') dispatchVideo({ type: ADD_LIKETOVIDEO });
         if (type === 'delete') dispatchVideo({ type: DELETE_LIKETOVIDEO });
      },
      [dispatchVideo]
   );

   const videoSubscribeHandle = useCallback(
      function (type) {
         if (type === 'add') dispatchVideo({ type: ADD_SUBSCRIBETOVIDEO });
         if (type === 'delete') dispatchVideo({ type: DELETE_SUBSCRIBETOVIDEO });
      },
      [dispatchVideo]
   );

   // async function getYoutubeVideo(id) {
   //     try {
   //        const { data } = await Youtube.get('/videos', {
   //          params: {
   //             id
   //          }
   //       });
   //        console.log({
   //          videoId: data.items[0].id,
   //          title:data.items[0].snippet.title,
   //          description: data.items[0].snippet.description,
   //          publishedAt: data.items[0].snippet.publishedAt,
   //          images: data.items[0].snippet.thumbnails.medium.url
   //        });
   //     } catch (err) {
   //         console.log(err.response);
   //     }
   // }

   // Get Channel Image from Youtube
   // const {data: data2} = await getChannel(data.video.channel.channelId);
   // console.log(data2.items[0].snippet.thumbnails.medium.url)
   // async function getChannel(channelId) {
   // return await Youtube.get('/channels', {
   //             params: {
   //                 id: channelId
   //             }
   //         });
   // }

   const value = useMemo(
      () => ({
         video: stateVideo.video,
         statusVideo: stateVideo.status,
         errorVideo: stateVideo.error
      }),
      [stateVideo]
   );

   const actions = useMemo(
      () => ({
         fetchVideo,
         getVideoById,
         videoLikeHandle,
         videoSubscribeHandle
      }),
      [fetchVideo, getVideoById, videoLikeHandle, videoSubscribeHandle]
   );

   return (
      <VideoStateProvider value={value}>
         <VideoActionProvider value={actions}>{children}</VideoActionProvider>
      </VideoStateProvider>
   );
};

export default VideoStore;

//Get Related Videos
// const response = await Youtube.get('/search', {
//  params: {
//    relatedToVideoId: data.items[0].id,
//    maxResults:10
//  }
// })
