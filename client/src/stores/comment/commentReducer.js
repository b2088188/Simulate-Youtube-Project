import * as R from 'ramda';
import {
	GET_COMMENTS,
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	SET_CURRENT,
	CLEAR_CURRENT
} from '../types';

function commentReducer(currentState, action) {
	const {comments} = currentState;
	switch(action.type) {
		 case ADD_COMMENT:
		   return {
		   	...currentState,
		   	currentComment: action.payload.comment
		   }
		 case UPDATE_COMMENT:
		   return {
		   	...currentState,
            comments: R.update(currentState.comments.findIndex(el => el._id === action.payload.comment._id), action.payload.comment, currentState.comments)
		   }
		 case DELETE_COMMENT:
		   return {
		   	...currentState,
		   	comments: R.reject(el => el._id === action.payload.id, currentState.comments)
		   }
		 case SET_CURRENT:
		   return {
		   	...currentState,
		   	current: action.payload.current
		   }
		 case CLEAR_CURRENT:
		   return {
		   	...currentState,
		   	current: null
		   }
		default:
		  return currentState;
	}
}

export default commentReducer;