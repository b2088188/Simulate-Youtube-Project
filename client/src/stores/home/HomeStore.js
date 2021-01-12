import React, { useReducer } from 'react';
import { HomeProvider } from './homeContext';
import homeReducer from './homeReducer.js';
import axios from 'axios';

const InitialState = {
   results: [],
   loading: null,
   error: null
};

const HomeStore = ({ children }) => {
   const [state, dispatch] = useReducer(homeReducer, InitialState);

   async function loadHomeVideos() {
      try {
         dispatch({ type: 'LOADING' });
         const { data } = await axios.get('/api/v1/home');
         dispatch({
            type: 'RESPONSE_COMPLETE',
            payload: {
               videos: data.data.videos
            }
         });
      } catch (err) {
         console.log(err.response);
      }
   }

   const value = {
      results: state.results,
      loading: state.loading,
      loadHomeVideos
   };

   return <HomeProvider value={value}>{children}</HomeProvider>;
};

export default HomeStore;
