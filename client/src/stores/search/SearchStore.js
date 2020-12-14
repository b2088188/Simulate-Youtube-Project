import React, {useReducer} from 'react';
import {SearchProvider} from './searchContext';
import Youtube from '../../apis/youtube';
import searchReducer from './searchReducer';
import {
LOADING,
RESPONSE_COMPLETE,
RESPONSE_ERROR,
PAGE_CHANGE} from '../types';


const InitialState = {
	results: [],
	page: null,	
	pages: null,
	loading: null,
	error: null,
	nextPageToken: null
}

const SearchStore = ({
	children
}) => {	
   const [state, dispatch] = useReducer(searchReducer, InitialState);

   async function search(term) {	
	try {
		dispatch({type: LOADING});
	   const {data} = await  Youtube.get('/search', {
	   	  params: {
	   	  	q: term,
	   	  	maxResults:20
	   	  }
	   });
	   if(data.items.length<1)
	    return dispatch({
	        	type: RESPONSE_ERROR,
	        	payload: {
	        		error: 'No results found.'
	        	}
	        })
	   const pages = calcPageAmount(data.items.length);	   
	   dispatch({
	   	type: RESPONSE_COMPLETE,
	   	payload: {	   		
	   		data: data.items,
	   		pages,
	   		nextPageToken: data.nextPageToken
	   	}
	   })
	}
	catch(err) {
	        console.log(err);
	}			
}

async function nextPageResults(term) {
	try {
	   dispatch({type: LOADING});
	   const {data} = await  Youtube.get('/search', {
	   	  params: {
	   	  	q: 'asmr',
	   	  	maxResults:5,
	   	  	pageToken: state.nextPageToken
	   	  }
	   });   
	   const pages = calcPageAmount(data.items.length);	   
	   dispatch({
	   	type: RESPONSE_COMPLETE,
	   	payload: {	   		
	   		data: data.items,
	   		pages,
	   		nextPageToken: data.nextPageToken
	   	}
	   })
	}
	catch(err) {
	 console.log(err.response);       
	}			
}

function calcPageAmount(listLength, resPerPage = 10) {
	return Math.ceil(listLength / resPerPage);
}

function changePage(page) {
	return function () {
		dispatch({
			type: PAGE_CHANGE,
			payload: {
				page
			}
		})
	}
}



	const value = {
	  results: state.results,
	  loading: state.loading,
	  page: state.page,
	  pages: state.pages,
	  nextPageToken: state.nextPageToken,
	  error: state.error,
	  search,
	  changePage,
	  nextPageResults
	};
	return (
      <SearchProvider value = {value}>
      	{children}
      </SearchProvider>
		)
}


export default SearchStore;