import { fetchReducer } from '../../customhooks/useAsync';
import {
   REQUEST_RESOLVED,
   GET_AUTHINFO,
   LOGOUT_AUTH,
   AUTH_ERRORRESET,
   REQUEST_REJECTED
} from '../types';

function homeReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data,
            error: null
         };
      case GET_AUTHINFO:
         if (!currentState.initialAuthCheck)
            return {
               ...currentState,
               user: currentState.data?.user || null,
               status: 'resolved',
               initialAuthCheck: true
            };
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
      case AUTH_ERRORRESET:
         return {
            ...currentState,
            error: null
         };
      case REQUEST_REJECTED:
         if (!currentState.initialAuthCheck)
            return {
               ...currentState,
               status: 'rejected',
               initialAuthCheck: true
            };
         return {
            ...currentState,
            status: 'rejected',
            error: action.payload.error
         };
   }
   return fetchReducer(currentState, action);
}
export default homeReducer;
