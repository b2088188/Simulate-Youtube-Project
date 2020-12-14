import * as R from 'ramda';
import React, {useContext, useReducer, useRef} from 'react';
import {LikeProvider} from './likeContext';
import likeReducer from './likeReducer';
import AuthContext from '../auth/authContext';
import axios from 'axios';
import {
  CREATE_LIKE,
  GET_LIKES,
  LOADING,
  DELETE_LIKE,
  SET_LIKESTATUS
} from '../types';

const InitialState = {
	likes: [],
  currentLikeStatus: null,
  loading: null,
	error:null
}

const LikeStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(likeReducer, InitialState);
    const {token} = useContext(AuthContext);
    const config = useRef(null);
    config.current = {
							   	   	 headers: {   	   	 	
							   	   	 	 'Authorization': 'Bearer ' + token
							   	   	 }
							   	   };


    async function checkLikeStatus(videoId) {
      const { data } = await axios.get(`/api/v1/likes/${videoId}`);
        if (data.status === 'not found')
            return setLikeStatus(false);
        setLikeStatus(true);
    }

    function setLikeStatus(status) {
       dispatch({
        type: SET_LIKESTATUS,
        payload: {
          status
        }
       })
    }
   

   async function createLikeItem(video) {
   	try {
   		let likeItem = {
            videoId: video.id,
            channelId: video.snippet.channelId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            image: video.snippet.thumbnails.high.url,
            publishDate: video.snippet.publishedAt
   		}
   	    const {data}  = await axios.post('/api/v1/likes', likeItem, config.current);
   	    dispatch({
   	    	type: CREATE_LIKE,
   	    	payload: {
   	    		like: data.data.like
   	    	}
   	    })
   	}
   	catch(err) {
   	   console.log(err.response);     
   	}   			
   }

   async function getLikes() {
   	  try {
         dispatch({type: LOADING});
   	     const {data} = await axios.get('/api/v1/likes', config.current);
   	     dispatch({
          type: GET_LIKES,
          payload: {
            likes: data.data.likes
          }
         })
   	  }
   	  catch(err) {
   	       console.log(err.response);
   	  }   	  		
   }

   async function deleteLikeItem(id) {
    console.log(id)
      try {
          const {data} = await axios.delete(`/api/v1/likes/${id}`, config.current);   
          dispatch({
            type: DELETE_LIKE,
            payload: {
              videoId: id
            }
          })
      }
      catch(err) {
         console.log(err.response);     
      }          
   }



const value = {
  likes: state.likes,
  loading: state.loading,
  currentLikeStatus: state.currentLikeStatus,
  getLikes,
  createLikeItem,
  deleteLikeItem,
  checkLikeStatus,
  setLikeStatus
};

	return (
     <LikeProvider value = {value}>
     	{children}
     </LikeProvider>
		)
}

export default LikeStore;