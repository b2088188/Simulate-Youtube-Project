import './channelview.scss';
import React, { useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import {useChannelState} from '../../stores/channel/channelStateContext';
import {useChannelActions} from '../../stores/channel/channelActionContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import ChannelItem from './ChannelItem';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';

const ChannelView = ({
    history
}) => {
    const {isAuth} = useContext(AuthContext);
    const {channel, channelVideos, statusChannel, errorChannel} = useChannelState();
    const { fetchChannel } = useChannelActions();
    const {currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle} = useContext(SubscribeContext);
    const {channelId} = useParams();
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
                            onClick = {isAuth ? onSubscribeClick(channel) : () => history.push('/login')}            
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