import {
    LOADING,
    RESPONSE_COMPLETE,
    RESPONSE_ERROR
} from '../types';

function channelReducer(currentState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...currentState,
                loading: true
            }
        case RESPONSE_COMPLETE:
            return {
                ...currentState,
                results: action.payload.videos,
                channel: action.payload.channel,
                loading: false
            }
        case RESPONSE_ERROR:
          return {
            ...currentState,
            error: action.payload.error
          }
        default:
            return currentState;
    }
}

export default channelReducer;