import {
   LOADING,
   RESPONSE_COMPLETE,
   RESPONSE_ERROR,
   PAGE_CHANGE,
} from '../types';

function searchReducer(currentState, action) {
   switch (action.type) {
      case 'GET_VIDEOS':
         return {
            ...currentState,
            videos: action.payload.videos,
         };
      default:
         return currentState;
   }
}

export default searchReducer;
