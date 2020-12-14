import './channelview.scss';
import React, { useEffect, useContext } from 'react';
import AuthContext from '../../stores/auth/authContext';
import ChannelContext from '../../stores/channel/channelContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import ChannelItem from './ChannelItem';
import Spinner from '../../utils/spinner/Spinner';
// currentSubscribeStatus
// addSubscribe
// getSubscribes
//  setSubscribeStatus
const ChannelView = ({
    match,
    history
}) => {
    const {isAuth} = useContext(AuthContext);
    const { getChannelVideos, results, channel, loading } = useContext(ChannelContext);
    const {currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle} = useContext(SubscribeContext);
    useEffect(() => {
        getChannelVideos(match.params.channelId);
        checkSubscribeStatus(match.params.channelId);
    }, [match.params.channelId]);

    function renderChannelVideos(list) {
        return list.map(function generateItem(video) {
            return <ChannelItem key = {video.id} video = {video} />
        })
    }

    function onSubscribeClick(channel) {
      return function () {
          onSubscribeHandle(channel);
      }
    }

    if(loading)
        return (
         <Spinner />
            )
   if(!channel)
    return null;

    return (
        <div className = "channel-view">
        <div className = "channel-view__info">
            <div className = "channel-view__userbox">
                <img className = "channel-view__userphoto" src = {channel.snippet.thumbnails.medium.url} />
                <h1 className = "channel-view__username">{channel.snippet.title}</h1>
            </div>
            <button className = {`channel-view__btnsubscribe ${currentSubscribeStatus && 'channel-view__btnsubscribe--active'}`}
                            onClick = {isAuth ? onSubscribeClick(channel) : () => history.push('/login')}            
            >
                Subscribed
            </button>
        </div>
        <div className = "channel-view__videobox">
            {renderChannelVideos(results)}
        </div>
     </div>
    )
}

export default ChannelView;