import React, { useReducer, useMemo, useCallback } from 'react';
import { HomeStateProvider } from './homeStateContext';
import { HomeActionProvider } from './homeActionContext';
import homeReducer from './homeReducer';
import Youtube from '../../apis/youtube';
import { GET_HOMERESULTS, PAGE_CHANGE, HOME_RESET } from '../types';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';

const HomeStore = ({ children }) => {
   const [stateHomeResults, fetchHomeResults, dispatchHomeResults] = useAsync(
      {
         data: {},
         videos: [],
         page: 1,
         hasMore: false
      },
      homeReducer
   );
   const getHomeVideos = useCallback(
      async function (page) {
         const { status } = await fetchHomeResults(
            axios.get(`/api/v1/videos/?page=${page}&limit=12`)
         );
         if (status === 'success')
            dispatchHomeResults({
               type: GET_HOMERESULTS
            });
      },
      [fetchHomeResults, dispatchHomeResults]
   );

   const pageChange = useCallback(
      function () {
         dispatchHomeResults({ type: PAGE_CHANGE });
      },
      [dispatchHomeResults]
   );

   const homeReset = useCallback(
      function () {
         dispatchHomeResults({ type: HOME_RESET });
      },
      [dispatchHomeResults]
   );

   // async function search(term) {
   //    try {
   //Search results
   // const { data } = await Youtube.get('/search', {
   //    params: {
   //       q: term,
   //       maxResults: 10,
   //    },
   // });
   // const videos = data.items.map((el) => {
   //    return {
   //       videoId: el.id.videoId,
   //       title: el.snippet.title,
   //       description: el.snippet.description,
   //       publishedAt: el.snippet.publishedAt,
   //       images: el.snippet.thumbnails.medium.url,
   //    };
   // });

   // Video Results
   //       const { data } = await Youtube.get('/channels', {
   //          params: {
   //             id: term
   //          }
   //       });
   //       console.log({
   //          title: data.items[0].snippet.title,
   //          publishedAt: data.items[0].snippet.publishedAt,
   //          image: data.items[0].snippet.thumbnails.medium.url
   //       });
   //    } catch (err) {
   //       console.log(err);
   //    }
   // }

   const value = useMemo(
      () => ({
         videos: stateHomeResults.videos,
         statusVideos: stateHomeResults.status,
         page: stateHomeResults.page,
         hasMore: stateHomeResults.hasMore,
         errorVideos: stateHomeResults.error
      }),
      [stateHomeResults]
   );
   const actions = useMemo(
      () => ({
         getHomeVideos,
         pageChange,
         homeReset
      }),
      [getHomeVideos, pageChange, homeReset]
   );

   return (
      <HomeStateProvider value={value}>
         <HomeActionProvider value={actions}>{children}</HomeActionProvider>
      </HomeStateProvider>
   );
};

export default HomeStore;
