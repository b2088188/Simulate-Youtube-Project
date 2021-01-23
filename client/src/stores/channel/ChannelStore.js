import React, { useMemo, useCallback } from 'react';
import { ChannelStateProvider } from './channelStateContext';
import { ChannelActionProvider } from './channelActionContext';
import channelReducer from './channelReducer';
import Youtube from '../../apis/youtube';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';
import { ADD_SUBSCRIBETOCHANNEL, DELETE_SUBSCRIBETOCHANNEL } from '../types';

const ChannelStore = ({ children }) => {
   const [stateChannel, fetchChannel, dispatchChannel] = useAsync(
      {
         data: [],
         channel: null
      },
      channelReducer
   );

   const [stateChannelVideos, fetchChannelVideos, dispatchChannelVideos] = useAsync({
      data: {}
   });

   const getChannel = useCallback(
      async function (channelId) {
         fetchChannel(
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/channels/${channelId}`)
         );
      },
      [fetchChannel]
   );

   const channelSubscribeHandle = useCallback(
      function (type) {
         if (type === 'add') dispatchChannel({ type: ADD_SUBSCRIBETOCHANNEL });
         if (type === 'delete') dispatchChannel({ type: DELETE_SUBSCRIBETOCHANNEL });
      },
      [dispatchChannel]
   );

   const getChannelVideos = useCallback(
      async function (channelId) {
         fetchChannelVideos(
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/channels/${channelId}/videos`)
         );
      },
      [fetchChannelVideos]
   );

   //   async function getChannelVideos(id) {
   //     try {
   //         dispatch({type: LOADING});
   //           const {data} = await Youtube.get('/channels', {
   //         params: {
   //           part: 'snippet,contentDetails',
   //           id
   //         }
   //        });
   //           console.log({
   //             channelId: data.items[0].id,
   //             title: data.items[0].snippet.title,
   //             publishedAt: data.items[0].snippet.publishedAt,
   //             image: data.items[0].snippet.thumbnails.medium.url
   //           })
   //           if(data.pageInfo.totalResults.length<1)
   //                return setResponseError();
   //      const res = await getVideos(data.items[0].contentDetails.relatedPlaylists.uploads);
   //      dispatch({
   //       type: RESPONSE_COMPLETE,
   //       payload: {
   //         channel: data.items[0],
   //         videos: res.data.items
   //       }
   //      })
   //     }
   //     catch(err) {
   //         console.log(err.response)
   //     }
   //  }

   //  async function getVideos(playlistId) {
   //   return  await Youtube.get('/playlistItems', {
   //       params: {
   //         playlistId,
   //         maxResults: 15
   //       }
   //      })
   //  }

   // function setResponseError() {
   //   dispatch({
   //     type: RESPONSE_ERROR,
   //     error: 'No results found with the channel Id'
   //   })
   // }

   const value = useMemo(
      () => ({
         channel: stateChannel.channel,
         statusChannel: stateChannel.status,
         errorChannel: stateChannel.error,
         channelVideos: stateChannelVideos.data.data,
         statusChannelVideos: stateChannelVideos.status,
         errorChannelVideos: stateChannelVideos.error
      }),
      [stateChannel, stateChannelVideos]
   );

   const actions = useMemo(
      () => ({
         getChannel,
         getChannelVideos,
         channelSubscribeHandle
      }),
      [getChannel, getChannelVideos, channelSubscribeHandle]
   );

   return (
      <ChannelStateProvider value={value}>
         <ChannelActionProvider value={actions}>{children}</ChannelActionProvider>
      </ChannelStateProvider>
   );
};

export default ChannelStore;
