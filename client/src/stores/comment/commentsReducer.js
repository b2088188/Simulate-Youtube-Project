import * as R from 'ramda';
import { fetchReducer } from '../../customhooks/useAsync';
import {
   REQUEST_RESOLVED,
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';

function commentsReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data
         };
      case GET_COMMENTS:
         return {
            ...currentState,
            comments: currentState.data.comments,
            status: 'resolved'
         };
      case ADD_COMMENT:
         return {
            ...currentState,
            comments: [...currentState.comments, currentState.data.comment],
            status: 'resolved'
         };
      case UPDATE_COMMENT:
         return {
            ...currentState,
            comments: R.update(
               currentState.comments.findIndex((el) => el._id === currentState.data.comment._id),
               currentState.data.comment,
               currentState.comments
            ),
            status: 'resolved'
         };
      case DELETE_COMMENT:
         return {
            ...currentState,
            comments: R.reject((el) => el._id === action.payload.commentId, currentState.comments),
            status: 'resolved'
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
