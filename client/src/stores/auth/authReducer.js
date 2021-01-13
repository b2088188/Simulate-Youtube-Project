import { fetchReducer } from '../../customhooks/useAsync';
import { REQUEST_RESOLVED, GET_AUTHINFO, LOGOUT_AUTH } from '../types';

function homeReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data
         };
      case GET_AUTHINFO:
         return {
            ...currentState,
            user: currentState.data?.user || null,
            status: 'resolved'
         };
      case LOGOUT_AUTH:
         return {
            ...currentState,
            user: null,
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}
export default homeReducer;
