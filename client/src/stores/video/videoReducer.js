import { LOADING, RESPONSE_COMPLETE, RESPONSE_ERROR } from "../types";

function videoReducer(currentState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...currentState,
        loading: true,
      };
    case RESPONSE_COMPLETE:
      return {
        ...currentState,
        loading: false,
        video: action.payload.video,
        channel: action.payload.channel,
      };
    case RESPONSE_ERROR:
      return {
        ...currentState,
        loading: false,
        error: action.payload.error,
      };
    default:
      return currentState;
  }
}

export default videoReducer;
