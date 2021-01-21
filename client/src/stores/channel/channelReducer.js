import { fetchReducer } from '../../customhooks/useAsync';
import { REQUEST_RESOLVED, ADD_SUBSCRIBETOCHANNEL, DELETE_SUBSCRIBETOCHANNEL } from '../types';

function channelReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            channel: action.payload.data.channel,
            channelVideos: action.payload.data.videos,
            status: 'resolved',
            error: null
         };
      case ADD_SUBSCRIBETOCHANNEL:
         return {
            ...currentState,
            channel: {
               ...currentState.channel,
               subscribes: currentState.channel.subscribes + 1
            }
         };
      case DELETE_SUBSCRIBETOCHANNEL:
         return {
            ...currentState,
            channel: {
               ...currentState.channel,
               subscribes: currentState.channel.subscribes - 1
            }
         };
   }
   return fetchReducer(currentState, action);
}

export default channelReducer;
