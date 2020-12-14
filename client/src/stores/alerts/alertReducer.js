import * as R from 'ramda';
import {
SET_ALERT,
CLEAR_ALERT
} from '../types';

function alertReducer(currentState, action) {
	switch(action.type) {
		case SET_ALERT:
		 return [...currentState, action.payload.alert];
	    case CLEAR_ALERT:
	     return R.reject(alert => alert.id === action.payload.id, currentState);
		default:
		  return currentState;
	}
}

export default alertReducer;