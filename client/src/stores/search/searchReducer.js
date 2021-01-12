import { fetchReducer } from '../../customhooks/useAsync';
import { GET_SEARCHRESULTS, SEARCH_RESET, PAGE_CHANGE } from '../types';

function searchReducer(currentState, action) {
   switch (action.type) {
      case GET_SEARCHRESULTS:
         return {
            ...currentState,
            videos: [...currentState.videos, ...action.payload.videos],
            hasMore: action.payload.videos.length > 0
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
