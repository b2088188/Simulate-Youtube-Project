import * as R from 'ramda';
import {
   CREATE_USERLIKE,
   GET_USERLIKES,
   DELETE_USERLIKE,
   LOADING,
   SET_LIKESTATUS,
} from '../types';
import { fetchReducer } from '../../customhooks/useAsync';

function likeReducer(currentState, action) {
   switch (action.type) {
      case CREATE_USERLIKE:
         return {
            ...currentState,
            likes: [...currentState.likes, currentState.data.like],
         };
      case GET_USERLIKES:
         return {
            ...currentState,
            likes: currentState.data.likes,
         };
      case SET_LIKESTATUS:
         return {
            ...currentState,
            currentLikeStatus: action.payload.status,
         };
      case DELETE_USERLIKE:
         return {
            ...currentState,
            likes: R.reject(
               (el) => el.videoId === action.payload.videoId,
               currentState.likes
            ),
         };
   }
}

export default likeReducer;
