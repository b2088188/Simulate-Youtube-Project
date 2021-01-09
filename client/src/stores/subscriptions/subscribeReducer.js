import * as R from "ramda";
import {
  LOADING,
  RESPONSE_COMPLETE,
  ADD_SUBSCRIBE,
  DELETE_SUBSCRIBE,
  GET_SUBSCRIPTIONS,
  SET_SUBSCRIBESTATUS,
} from "../types";

function subscribeReducer(currentState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...currentState,
        loading: true,
      };
    case ADD_SUBSCRIBE:
      return {
        ...currentState,
        subscriptions: [
          ...currentState.subscriptions,
          action.payload.subscribe,
        ],
        loading: false,
      };
    case GET_SUBSCRIPTIONS:
      return {
        ...currentState,
        subscriptions: action.payload.subscribes,
        loading: false,
      };
    case DELETE_SUBSCRIBE:
      return {
        ...currentState,
        subscriptions: R.reject(
          (el) => el.channelId === action.payload.id,
          currentState.subscriptions
        ),
      };
    case SET_SUBSCRIBESTATUS:
      return {
        ...currentState,
        currentSubscribeStatus: action.payload.status,
      };
    default:
      return currentState;
  }
}

export default subscribeReducer;
