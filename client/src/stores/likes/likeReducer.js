import * as R from 'ramda';
import {
	CREATE_LIKE,
	GET_LIKES,
	DELETE_LIKE,
	LOADING,
	SET_LIKESTATUS
} from '../types';

function likeReducer(currentState, action) {
	const {likes} = currentState;
	switch(action.type) {
		case LOADING:
		  return {
		  	...currentState,
		  	loading:true
		  }
		case CREATE_LIKE:
		  return {
		  	...currentState,
		  	likes: [...likes, action.payload.like]
		  }
		case GET_LIKES:
		  return {
		  	...currentState,
		  	likes: action.payload.likes,
		  	loading:false
		  }
		case SET_LIKESTATUS:
		  return {
		  	...currentState,
		  	currentLikeStatus: action.payload.status
		  }
		case DELETE_LIKE:
		  return {
		  	...currentState,
		  	likes: R.reject(el => el.videoId === action.payload.videoId, currentState.likes)
		  }
		default:
		  return currentState;
	}
}

export default likeReducer;