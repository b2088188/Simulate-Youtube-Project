import React, {useReducer, useContext, useRef} from 'react';
import {CommentProvider} from './commentContext';
import commentReducer from './commentReducer';
import AuthContext from '../auth/authContext';
import VideoContext from '../video/videoContext';
import axios from 'axios';
import {
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';

const InitialState = {
	comments: [],
   current: null,
	loading: null,
	error: null
}

const CommentStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(commentReducer, InitialState);
    const {token} = useContext(AuthContext);
    const {video} = useContext(VideoContext);
    let config = useRef(null);
    config.current = {
							   	   	 headers: {   	   	 	
							   	   	 	 'Authorization': 'Bearer ' + token
							   	   	 }
							   	   };

  async function getComments(id) {  
  	try {
  	   const {data} = await axios.get(`/api/v1/comments/${id}`);
      dispatch({
      	type: GET_COMMENTS,
      	payload: {
      		comments: data.data.comments
      	}
      })
  	}
  	catch(err) {
  	   console.log(err.response);     
  	}
  			
  }

  async function addComment({comment}) {
  	try {
  		  let commentItem = {
  		  	videoId: video.id,
  		  	comment
  		  }
  	      const {data} = await axios.post('/api/v1/comments', commentItem, config.current);
  	      dispatch({
            type: ADD_COMMENT,
            payload: {
               comment: data.data.comment
            }
         })
  	}
  	catch(err) {
  	   console.log(err.response);     
  	}  			
  }

  async function updateComment(currentId, {comment}) {
   try {
        let commentItem = {
         comment
        }
         const {data} = await axios.patch(`/api/v1/comments/${currentId}`, commentItem, config.current);
         dispatch({
            type: UPDATE_COMMENT,
            payload: {
               comment: data.data.comment
            }
         })
   }
   catch(err) {
      console.log(err.response);     
   }           
  }

  async function deleteComment(id) {   
     try {
        await axios.delete(`/api/v1/comments/${id}`, config.current);           
        dispatch({
         type: DELETE_COMMENT,
         payload: {
            id
         }
      })
     }
     catch(err) {
       console.log(err.response);      
     }
           
  }

  function setCurrent(comment) {
   return function () {
      dispatch({
         type: SET_CURRENT,
         payload: {
            current: comment
         }
      })
   }
  }

  function clearCurrent() {
    dispatch({type: CLEAR_CURRENT});
  }
  
  const value = {  	
  	comments: state.comments,
   current: state.current,
  	getComments,
   addComment,
   updateComment,
   deleteComment,
   setCurrent,
   clearCurrent
  };

	return (
    <CommentProvider value = {value}>
    	{children}
    </CommentProvider>
		)
}

export default CommentStore;