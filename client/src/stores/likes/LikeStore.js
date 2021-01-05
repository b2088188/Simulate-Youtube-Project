import * as R from 'ramda';
import React, {useReducer, useMemo} from 'react';
import {LikeStateProvider} from './likeStateContext';
import {LikeActionProvider} from './likeActionContext';
import likeReducer from './likeReducer';
import axios from 'axios';
import useAsync from '../../customhooks/useAsync';

const InitialState = {
  currentLikeStatus: null,
  loading: null,
	error:null
}

const LikeStore = ({
	children
}) => {
const [stateLikes, fetchLikes] = useAsync({       
      data: []
    })

const [stateLike, fetchLike] = useAsync({       
      data: {}
    })



    async function checkLikeStatus(videoId) {
      // const { data } = await axios.get(`/api/v1/likes/${videoId}`);
      //   if (data.status === 'not found')
      //       return setLikeStatus(false);
      //   setLikeStatus(true);
    }

    function setLikeStatus(status) {
       // dispatch({
       //  type: SET_LIKESTATUS,
       //  payload: {
       //    status
       //  }
       // })
    }
   


   async function getLikes() {
   	  // try {
      //    dispatch({type: LOADING});
   	  //    const {data} = await axios.get('/api/v1/likes', config.current);
   	  //    dispatch({
      //     type: GET_LIKES,
      //     payload: {
      //       likes: data.data.likes
      //     }
      //    })
   	  // }
   	  // catch(err) {
   	  //      console.log(err.response);
   	  // }   	  		
   }

   async function deleteLikeItem(id) {
      // try {
      //     const {data} = await axios.delete(`/api/v1/likes/${id}`, config.current);   
      //     dispatch({
      //       type: DELETE_LIKE,
      //       payload: {
      //         videoId: id
      //       }
      //     })
      // }
      // catch(err) {
      //    console.log(err.response);     
      // }          
   }



// const value = {
//   likes: state.likes,
//   loading: state.loading,
//   currentLikeStatus: state.currentLikeStatus,
//   getLikes,
//   createLikeItem,
//   deleteLikeItem,
//   checkLikeStatus,
//   setLikeStatus
// };

  const value = useMemo(() => ({
        likes: stateLikes.data.likes,
        statusLikes: stateLikes.status,
        errorLikes: stateLikes.error,
        like: stateLike.data?.like || {},
        statusLike: stateLike.status,
        errorLike: stateLike.error
      }), [stateLikes, stateLike])

  const actions = useMemo(() => ({
    fetchLikes,
    fetchLike
  }), [fetchLikes, fetchLike])

	return (
     <LikeStateProvider value = {value}>
       <LikeActionProvider value = {actions}>
         {children}
       </LikeActionProvider>
     </LikeStateProvider>
		)
}

export default LikeStore;