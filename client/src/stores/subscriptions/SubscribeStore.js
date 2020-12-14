import * as R from 'ramda';
import React, { useReducer } from 'react';
import { SubscribeProvider } from './subscribeContext';
import subscribeReducer from './subscribeReducer';
import axios from 'axios';
import {
    LOADING,
    ADD_SUBSCRIBE,
    DELETE_SUBSCRIBE,
    GET_SUBSCRIPTIONS,
    SET_SUBSCRIBESTATUS
} from '../types';

const InitialState = {
    subscriptions: [],
    currentSubscribeStatus: null,
    loading: null,
    error: null
}

const SubscribeStore = ({
    children
}) => {
    const [state, dispatch] = useReducer(subscribeReducer, InitialState);

    async function addSubscribe(channel) {
        try {
            let items = {
                channelId: channel.id,
                title: channel.snippet.title,
                image: channel.snippet.thumbnails.medium.url
            }
            dispatch({ type: LOADING });
            const { data } = await axios.post('/api/v1/subscriptions', items);
            dispatch({
                type: ADD_SUBSCRIBE,
                payload: {
                    subscribe: data.data.subscribe
                }
            })
        } catch (err) {
            console.log(err.response)
        }
    }

    async function getSubscribes() {
        try {
            dispatch({ type: LOADING });
            const { data } = await axios.get('/api/v1/subscriptions');
            dispatch({
                type: GET_SUBSCRIPTIONS,
                payload: {
                    subscribes: data.data.subscribes
                }
            })
        } catch (err) {
            console.log(err.response);
        }
    }

    async function deleteSubscribe(id) {
        try {
            await axios.delete(`/api/v1/subscriptions/${id}`);
            dispatch({
                type: DELETE_SUBSCRIBE,
                payload: {
                    id
                }
            })
        } catch (err) {
            console.log(err.response);
        }
    }

    const onSubscribeHandle = R.curry(function(currentSubscribeStatus, channel) {
             !currentSubscribeStatus ? addSubscribe(channel) : deleteSubscribe(channel.id);            
                setSubscribeStatus(!currentSubscribeStatus);
       }, 2)(state.currentSubscribeStatus)

    async function checkSubscribeStatus(channelId) {
        const { data } = await axios.get(`/api/v1/subscriptions/${channelId}`);
        if (data.status === 'not found')
            return setSubscribeStatus(false);
        setSubscribeStatus(true);
    }

    function setSubscribeStatus(status) {
        dispatch({
            type: SET_SUBSCRIBESTATUS,
            payload: {
                status
            }
        })
    }




    const value = {
        subscriptions: state.subscriptions,
        loading: state.loading,
        currentSubscribeStatus: state.currentSubscribeStatus,
        getSubscribes,
        checkSubscribeStatus,
        onSubscribeHandle
    };

    return (
        <SubscribeProvider value = {value}>
         {children}
       </SubscribeProvider>
    )
}

export default SubscribeStore;