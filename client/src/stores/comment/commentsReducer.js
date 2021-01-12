import * as R from 'ramda';
import { fetchReducer } from '../../customhooks/useAsync';
import {
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';

function commentsReducer(currentState, action) {
   switch (action.type) {
      case GET_COMMENTS:
         return {
            ...currentState,
            comments: action.payload.comments
         };
      case ADD_COMMENT:
         return {
            ...currentState,
            comments: [...currentState.comments, action.payload.comment]
         };
      case UPDATE_COMMENT:
         return {
            ...currentState,
            comments: R.update(
               currentState.comments.findIndex((el) => el._id === action.payload.comment._id),
               action.payload.comment,
               currentState.comments
            )
         };
      case DELETE_COMMENT:
         return {
            ...currentState,
            comments: R.reject((el) => el._id === action.payload.commentId, currentState.comments)
         };
      case SET_CURRENT:
         return {
            ...currentState,
            current: action.payload.current
         };
      case CLEAR_CURRENT:
         return {
            ...currentState,
            current: null
         };
   }
   return fetchReducer(currentState, action);
}

export default commentsReducer;
