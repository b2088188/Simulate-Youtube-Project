import React, { useReducer, useContext } from 'react';
import { VideoProvider } from './videoContext';
import videoReducer from './videoReducer';
import {
    RESPONSE_COMPLETE,
    RESPONSE_ERROR,
    LOADING
} from '../types';
import Youtube from '../../apis/youtube';
import axios from 'axios';

const InitialState = {
    video: null,
    channel: null,
    loading: null,
    error: null
}



const VideoStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(videoReducer, InitialState);
    


    async function getVideo(id) {
        try {
            dispatch({ type: LOADING });
            const { data } = await Youtube.get('/videos', {
                params: {
                    id
                }
            });
            if (data.items.length < 1)
                return dispatch({
                    type: RESPONSE_ERROR,
                    payload: {
                        error: 'No video found with that Id'
                    }
                })
            const res = await getChannel(data.items[0].snippet.channelId);
            dispatch({
                type: RESPONSE_COMPLETE,
                payload: {
                    video: data.items[0],
                    channel: res.data.items[0]
                }
            })
        } catch (err) {
            console.log(err.response);
        }
    }

    async function getChannel(channelId) {
    return await Youtube.get('/channels', {
                params: {
                    id: channelId
                }
            });
    }



    const value = {
        video: state.video,
        channel: state.channel,
        loading: state.loading,
        getVideo
    };

    return (
        <VideoProvider value = {value}>
     	{children}
     </VideoProvider>
    )
}

export default VideoStore;



//Get Related Videos
// const response = await Youtube.get('/search', {
// 	params: {
// 		relatedToVideoId: data.items[0].id,
// 		maxResults:10
// 	}
// })