import React, {useReducer, useMemo} from 'react';
import {CommentStateProvider} from './commentStateContext';
import {CommentActionProvider} from './commentActionContext';
import commentReducer from './commentReducer';
import AuthContext from '../auth/authContext';
import {
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';
import useAsync from '../../customhooks/useAsync';

const InitialState = {
	comments: [],
   current: null,
	loading: null,
	error: null
}

const CommentStore = ({
	children
}) => {
	//const [state, dispatch] = useReducer(commentReducer, InitialState);
   const [stateComments, fetchComments] = useAsync({       
      data: []  
    })
    //const {token} = useContext(AuthContext);
    //const {video} = useContext(VideoContext);
  //   let config = useRef(null);
  //   config.current = {
		// 					   	   	 headers: {   	   	 	
		// 					   	   	 	 'Authorization': 'Bearer ' + token
		// 					   	   	 }
		// 					   	   };

  // async function getComments(id) {  
  // 	try {
  // 	   const {data} = await axios.get(`/api/v1/comments/${id}`);
  //     dispatch({
  //     	type: GET_COMMENTS,
  //     	payload: {
  //     		comments: data.data.comments
  //     	}
  //     })
  // 	}
  // 	catch(err) {
  // 	   console.log(err.response);     
  // 	}
  			
  // }

  async function addComment({comment}) {
  	// try {
  	// 	  let commentItem = {
  	// 	  	videoId: video.id,
  	// 	  	comment
  	// 	  }
  	//       const {data} = await axios.post('/api/v1/comments', commentItem, config.current);
  	//       dispatch({
   //          type: ADD_COMMENT,
   //          payload: {
   //             comment: data.data.comment
   //          }
   //       })
  	// }
  	// catch(err) {
  	//    console.log(err.response);     
  	// }  			
  }

  // async function updateComment(currentId, {comment}) {
  //  try {
  //       let commentItem = {
  //        comment
  //       }
  //        const {data} = await axios.patch(`/api/v1/comments/${currentId}`, commentItem, config.current);
  //        dispatch({
  //           type: UPDATE_COMMENT,
  //           payload: {
  //              comment: data.data.comment
  //           }
  //        })
  //  }
  //  catch(err) {
  //     console.log(err.response);     
  //  }           
  // }

  // async function deleteComment(id) {   
  //    try {
  //       await axios.delete(`/api/v1/comments/${id}`, config.current);           
  //       dispatch({
  //        type: DELETE_COMMENT,
  //        payload: {
  //           id
  //        }
  //     })
  //    }
  //    catch(err) {
  //      console.log(err.response);      
  //    }
           
  // }

  // function setCurrent(comment) {
  //  return function () {
  //     dispatch({
  //        type: SET_CURRENT,
  //        payload: {
  //           current: comment
  //        }
  //     })
  //  }
  // }

  // function clearCurrent() {
  //   dispatch({type: CLEAR_CURRENT});
  // }
  
  // const value = {  	
  // 	comments: state.comments,
  //  current: state.current,
  // 	getComments,
  //  addComment,
  //  updateComment,
  //  deleteComment,
  //  setCurrent,
  //  clearCurrent
  // };
  const value = useMemo(() => ({
      comments: stateComments.data.comments,
      statusComments: stateComments.status,
      errorComments: stateComments.error
  }), [stateComments])

  const actions = useMemo(() => ({
      fetchComments
  }), [fetchComments])

	return (
    <CommentStateProvider value = {value}>
       <CommentActionProvider value = {actions}>
          {children}
       </CommentActionProvider>
    </CommentStateProvider>
		)
}

export default CommentStore;