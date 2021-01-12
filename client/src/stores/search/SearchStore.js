import React, { useReducer, useMemo, useCallback } from 'react';
import { SearchStateProvider } from './searchStateContext';
import { SearchActionProvider } from './searchActionContext';
import searchReducer from './searchReducer';
import Youtube from '../../apis/youtube';
import { GET_SEARCHRESULTS, PAGE_CHANGE, SEARCH_RESET } from '../types';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';

const SearchStore = ({ children }) => {
   const [stateSearchResults, fetchSearchResults, dispatchSearchResults] = useAsync(
      {
         data: [],
         videos: [],
         page: 1,
         hasMore: false
      },
      searchReducer
   );
   const getSearchVideos = useCallback(
      async function (q, page) {
         console.log(page);
         const { data, status } = await fetchSearchResults(
            axios.get(`/api/v1/videos/?q=${q}&page=${page}`)
         );
         if (status === 'success')
            dispatchSearchResults({
               type: GET_SEARCHRESULTS,
               payload: {
                  videos: data.videos
               }
            });
      },
      [fetchSearchResults, dispatchSearchResults]
   );

   const pageChange = useCallback(
      function () {
         dispatchSearchResults({ type: PAGE_CHANGE });
      },
      [dispatchSearchResults]
   );

   const searchReset = useCallback(
      function () {
         dispatchSearchResults({ type: SEARCH_RESET });
      },
      [dispatchSearchResults]
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

   //Video Results
   //       const { data } = await Youtube.get('/channels', {
   //          params: {
   //             id: term,
   //          },
   //       });
   //       console.log({
   //          title: data.items[0].snippet.title,
   //          publishedAt: data.items[0].snippet.publishedAt,
   //          image: data.items[0].snippet.thumbnails.medium.url,
   //       });
   //    } catch (err) {
   //       console.log(err);
   //    }
   // }

   const value = useMemo(
      () => ({
         videos: stateSearchResults.videos,
         statusVideos: stateSearchResults.status,
         page: stateSearchResults.page,
         hasMore: stateSearchResults.hasMore,
         errorVideos: stateSearchResults.error
      }),
      [stateSearchResults]
   );
   const actions = useMemo(
      () => ({
         getSearchVideos,
         pageChange,
         searchReset
      }),
      [getSearchVideos, pageChange, searchReset]
   );

   return (
      <SearchStateProvider value={value}>
         <SearchActionProvider value={actions}>{children}</SearchActionProvider>
      </SearchStateProvider>
   );
};

export default SearchStore;
