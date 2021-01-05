import './channelview.scss';
import React, { useState, useEffect, useContext } from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useChannelState} from '../../stores/channel/channelStateContext';
import {useChannelActions} from '../../stores/channel/channelActionContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import ChannelItem from './ChannelItem';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';

const ChannelView = () => {
    const {user} = useAuthState();
    const {channel, channelVideos, statusChannel, errorChannel} = useChannelState();
    const { fetchChannel } = useChannelActions();
    const {currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle} = useContext(SubscribeContext);
    const {channelId} = useParams();
    const [toLogin, setToLogin] = useState(false);

    useEffect(() => {
        fetchChannel(axios.get(`/api/v1/channels/${channelId}/videos`));
        //checkSubscribeStatus(match.params.channelId);
    }, [channelId]);


    function renderChannelVideos(list) {
        return list.map(function generateItem(video) {
            return <ChannelItem key = {video._id} video = {video} />
        })
    }

    function onSubscribeClick(channel) {
      return function () {
          onSubscribeHandle(channel);
      }
    }
    if(toLogin)
        return <Redirect to = '/login' />

    if(statusChannel === 'idle' || statusChannel === 'pending')
        return (
         <Spinner />
            )
    if(statusChannel === 'resolved')            
    return (
        <div className = "channel-view">
        <div className = "channel-view__info">
            <div className = "channel-view__userbox">
                <img className = "channel-view__userphoto" src = {channel.image} />
                <h1 className = "channel-view__username">{channel.title}</h1>
            </div>
            <button className = {`channel-view__btnsubscribe ${currentSubscribeStatus && 'channel-view__btnsubscribe--active'}`}
                            onClick = {user ? onSubscribeClick(channel) : () => setToLogin(true)}            
            >
                Subscribed
            </button>
        </div>
        <div className = "channel-view__videobox">
            {renderChannelVideos(channelVideos)}
        </div>
     </div>
    )
}

export default ChannelView;