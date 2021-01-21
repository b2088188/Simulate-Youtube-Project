import { fetchReducer } from '../../customhooks/useAsync';
import {
   REQUEST_RESOLVED,
   ADD_LIKETOVIDEO,
   DELETE_LIKETOVIDEO,
   ADD_SUBSCRIBETOVIDEO,
   DELETE_SUBSCRIBETOVIDEO
} from '../types';

function videoReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            video: action.payload.data.video,
            status: 'resolved',
            error: null
         };
      case ADD_LIKETOVIDEO:
         return {
            ...currentState,
            video: {
               ...currentState.video,
               likes: currentState.video.likes + 1
            }
         };
      case DELETE_LIKETOVIDEO:
         return {
            ...currentState,
            video: {
               ...currentState.video,
               likes: currentState.video.likes - 1
            }
         };
      case ADD_SUBSCRIBETOVIDEO:
         return {
            ...currentState,
            video: {
               ...currentState.video,
               channel: {
                  ...currentState.video.channel,
                  subscribes: currentState.video.channel.subscribes + 1
               }
            }
         };
      case DELETE_SUBSCRIBETOVIDEO:
         return {
            ...currentState,
            video: {
               ...currentState.video,
               channel: {
                  ...currentState.video.channel,
                  subscribes: currentState.video.channel.subscribes - 1
               }
            }
         };
   }
   return fetchReducer(currentState, action);
}

export default videoReducer;
