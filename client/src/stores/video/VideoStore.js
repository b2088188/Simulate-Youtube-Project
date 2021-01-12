import React, { useMemo, useCallback } from 'react';
import { VideoStateProvider } from './videoStateContext';
import { VideoActionProvider } from './videoActionContext';
import Youtube from '../../apis/youtube';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';
const VideoStore = ({ children }) => {
   const [stateVideo, fetchVideo] = useAsync({
      data: {},
   });

   const getVideoById = useCallback(
      async function (videoId) {
         fetchVideo(axios.get(`/api/v1/videos/${videoId}`));
      },
      [fetchVideo]
   );

   // async function getVideo(id) {
   //     try {
   //         dispatch({ type: LOADING });
   //         const { data: {data} } = await axios.get(`/api/v1/videos/${id}`);

   //         dispatch({
   //             type: RESPONSE_COMPLETE,
   //             payload: {
   //                 video: data.video
   //             }
   //         })
   //     } catch (err) {
   //         console.log(err.response);
   //     }
   // }

   //Get Channel Image from Youtube
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
         video: stateVideo.data.video,
         statusVideo: stateVideo.status,
         errorVideo: stateVideo.error,
      }),
      [stateVideo]
   );

   const actions = useMemo(
      () => ({
         fetchVideo,
         getVideoById,
      }),
      [fetchVideo, getVideoById]
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
