import {
LOADING,
RESPONSE_COMPLETE,
RESPONSE_ERROR,
PAGE_CHANGE} from '../types';

function searchReducer(currentState, action) {	
	switch(action.type) {
		case LOADING:
		  return {
		  	...currentState,
		  	loading: true
		  }
		case RESPONSE_COMPLETE:
		  return {
		  	...currentState,
		  	loading: false,
		  	results: action.payload.data,
		  	page: 1,
		  	pages: action.payload.pages,
		  	nextPageToken: action.payload.nextPageToken
		  }  
		case RESPONSE_ERROR:
		  return {
		  	...currentState,
		  	loading:false,
		  	error: action.payload.error
		  }
		case PAGE_CHANGE:
		  return {
		  	...currentState,
		  	page: action.payload.page
		  }
		default:
		  return currentState;
	}
}

export default searchReducer;