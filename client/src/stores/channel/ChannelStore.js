import React, {useReducer} from 'react';
import {ChannelProvider} from './channelContext';
import channelReducer from './channelReducer';
import Youtube from '../../apis/youtube';
import {
LOADING,
RESPONSE_COMPLETE,
RESPONSE_ERROR	
} from '../types';

const InitialState = {
	results: [],
	channel: null,
	loading: null,
	error: null
}

const ChannelStore = ({
	children
}) => {
	const [state, dispatch] = useReducer(channelReducer, InitialState);

    async function getChannelVideos(id) {
    	try {
    		  dispatch({type: LOADING});
    	      const {data} = await Youtube.get('/channels', {
			      params: {
			      	part: 'snippet,contentDetails',
			        id
			      }
			     });
    	      console.log({
    	      	channelId: data.items[0].id,
    	      	title: data.items[0].snippet.title,
    	      	publishedAt: data.items[0].snippet.publishedAt,
    	      	image: data.items[0].snippet.thumbnails.medium.url
    	      })
    	      if(data.pageInfo.totalResults.length<1)
                 return setResponseError();
		     const res = await getVideos(data.items[0].contentDetails.relatedPlaylists.uploads);		     
		     dispatch({
		     	type: RESPONSE_COMPLETE,
		     	payload: {
		     		channel: data.items[0],
		     		videos: res.data.items
		     	}
		     })
    	}
    	catch(err) {
          console.log(err.response)
    	}
   }

   async function getVideos(playlistId) {
   	return  await Youtube.get('/playlistItems', {
		     	params: {
		     		playlistId,
		     		maxResults: 15     		
		     	}
		     })
   }

  function setResponseError() {
  	dispatch({
  		type: RESPONSE_ERROR,
  		error: 'No results found with the channel Id'
  	})
  }

const value = {
results: state.results,
channel: state.channel,
loading: state.loading,
getChannelVideos
};

	return (
     <ChannelProvider value = {value}>
     	{children}
     </ChannelProvider>
		)
}

export default ChannelStore;