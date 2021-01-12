import { LOADING, RESPONSE_COMPLETE } from '../types';

function homeReducer(currentState, action) {
   switch (action.type) {
      case LOADING:
         return {
            ...currentState,
            loading: true
         };
      case RESPONSE_COMPLETE:
         return {
            results: action.payload.videos,
            loading: false
         };
      default:
         return currentState;
   }
}
export default homeReducer;
