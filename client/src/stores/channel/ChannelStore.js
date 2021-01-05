import React, {useMemo} from 'react';
import {ChannelStateProvider} from './channelStateContext';
import {ChannelActionProvider} from './channelActionContext';
import Youtube from '../../apis/youtube';
import useAsync from '../../customhooks/useAsync';


const ChannelStore = ({
	children
}) => {
	const [stateChannel, fetchChannel] = useAsync({       
      data: {}
    })

  //   async function getChannelVideos(id) {
  //   	try {
  //   		  dispatch({type: LOADING});
  //   	      const {data} = await Youtube.get('/channels', {
		// 	      params: {
		// 	      	part: 'snippet,contentDetails',
		// 	        id
		// 	      }
		// 	     });
  //   	      console.log({
  //   	      	channelId: data.items[0].id,
  //   	      	title: data.items[0].snippet.title,
  //   	      	publishedAt: data.items[0].snippet.publishedAt,
  //   	      	image: data.items[0].snippet.thumbnails.medium.url
  //   	      })
  //   	      if(data.pageInfo.totalResults.length<1)
  //                return setResponseError();
		//      const res = await getVideos(data.items[0].contentDetails.relatedPlaylists.uploads);		     
		//      dispatch({
		//      	type: RESPONSE_COMPLETE,
		//      	payload: {
		//      		channel: data.items[0],
		//      		videos: res.data.items
		//      	}
		//      })
  //   	}
  //   	catch(err) {
  //         console.log(err.response)
  //   	}
  //  }

  //  async function getVideos(playlistId) {
  //  	return  await Youtube.get('/playlistItems', {
		//      	params: {
		//      		playlistId,
		//      		maxResults: 15     		
		//      	}
		//      })
  //  }

  // function setResponseError() {
  // 	dispatch({
  // 		type: RESPONSE_ERROR,
  // 		error: 'No results found with the channel Id'
  // 	})
  // }

const value = useMemo(() => ({
	channel: stateChannel.data.channel,
	channelVideos: stateChannel.data.videos,
	statusChannel: stateChannel.status,
	errorChannel: stateChannel.error
}), [stateChannel]);

const actions = useMemo(() => ({
	fetchChannel
}), [fetchChannel])

	return (
     <ChannelStateProvider value = {value}>
     	<ChannelActionProvider value = {actions}>
     		{children}
     	</ChannelActionProvider>
     </ChannelStateProvider>
		)
}

export default ChannelStore;