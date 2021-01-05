import React, {useReducer, useMemo} from 'react';
import {SearchStateProvider} from './searchStateContext';
import {SearchActionProvider} from './searchActionContext';
import Youtube from '../../apis/youtube';
import {
LOADING,
RESPONSE_COMPLETE,
RESPONSE_ERROR,
PAGE_CHANGE} from '../types';
import useAsync from '../../customhooks/useAsync';


const SearchStore = ({
	children
}) => {	
	const [stateVideos, fetchVideos] = useAsync({		
      data: []            
	})


//    async function search(term) {	
// 	try {
// 		dispatch({type: LOADING});
// 	   const {data: {data}} = await  axios.get('/api/v1/videos', {
// 	   	  params: {
// 	   	  	q: term	   	  	
// 	   	  }
// 	   });
// 	   //Get JSON
// 	  // const videos = data.items.map(el => {
// 	  //  	return {
// 	  //  		videoId: el.id.videoId,
// 	  //  		title: el.snippet.title,
// 	  //  		description: el.snippet.description,
// 	  //  		publishedAt: el.snippet.publishedAt,
// 	  //  		images: el.snippet.thumbnails.medium.url
// 	  //  	}
// 	  //  })
// 	   // if(data.items.length<1)
// 	   //  return dispatch({
// 	   //      	type: RESPONSE_ERROR,
// 	   //      	payload: {
// 	   //      		error: 'No results found.'
// 	   //      	}
// 	   //      })
// 	   dispatch({
// 	   	type: RESPONSE_COMPLETE,
// 	   	payload: {	   		
// 	   		videos: data.videos,
// 	   	}
// 	   })
// 	}
// 	catch(err) {
// 	        console.log(err);
// 	}			
// }





	const value = useMemo(() => ({
			  videos: stateVideos.data.videos,
			  statusVideos: stateVideos.status,
			  error: stateVideos.error
			}), [stateVideos]);
	const actions = useMemo(() => ({
			fetchVideos
		}), [fetchVideos])

	return (
      <SearchStateProvider value = {value}>
      	<SearchActionProvider value = {actions}>
      		{children}
      	</SearchActionProvider>
      </SearchStateProvider>
		)
}


export default SearchStore;