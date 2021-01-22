import { fetchReducer } from '../../customhooks/useAsync';
import { REQUEST_RESOLVED, GET_SEARCHRESULTS, SEARCH_RESET } from '../types';

function searchReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data,
            error: null
         };
      case GET_SEARCHRESULTS:
         return {
            ...currentState,
            videos: [...currentState.videos, ...currentState.data.data],
            hasMore: currentState.data.data.length > 0,
            status: 'resolved'
         };
      case SEARCH_RESET:
         return {
            ...currentState,
            videos: []
         };
   }
   return fetchReducer(currentState, action);
}

export default searchReducer;
