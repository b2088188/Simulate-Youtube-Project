import { fetchReducer } from '../../customhooks/useAsync';
import { REQUEST_RESOLVED, GET_SEARCHRESULTS, SEARCH_RESET, PAGE_CHANGE } from '../types';

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
      case PAGE_CHANGE:
         return {
            ...currentState,
            page: currentState.page + 1
         };
      case SEARCH_RESET:
         return {
            ...currentState,
            videos: [],
            page: 1
         };
   }
   return fetchReducer(currentState, action);
}

export default searchReducer;
