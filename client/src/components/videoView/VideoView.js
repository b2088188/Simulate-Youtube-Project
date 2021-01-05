import './videoview.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import {useVideoState} from '../../stores/video/videoStateContext';
import {useVideoActions} from '../../stores/video/videoActionContext';
import LikeContext from '../../stores/likes/likeContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import CommentView from '../commentView/CommentView';
import { Embed } from 'semantic-ui-react';
import { Icon, Accordion } from 'semantic-ui-react';
import { formatDate } from '../../utils/Format';
import axios from 'axios';


const VideoView = ({
    history
}) => {
    const { isAuth } = useContext(AuthContext);
    const {videoId} = useParams();
    const { video, statusVideo, errorVideo} = useVideoState();
    const {fetchVideo} = useVideoActions();
    const { currentLikeStatus, checkLikeStatus, createLikeItem, deleteLikeItem, setLikeStatus } = useContext(LikeContext);
    const { currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle } = useContext(SubscribeContext);


    const [descriptionShow, setDescriptionShow] = useState(false);
    useEffect(() => {
        fetchVideo(axios.get(`/api/v1/videos/${videoId}`))
        //checkLikeStatus(videoId);
    }, [videoId,  fetchVideo])

    // useEffect(() => {
    //     if (channel)
    //         checkSubscribeStatus(channel.id);
    // }, [channel])

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;


    function onLikeHandle(video) {
        return function() {
            !currentLikeStatus ? createLikeItem(video) : deleteLikeItem(video.id);
            setLikeStatus(!currentLikeStatus);
        }
    }

    function onSubscribeClick(channel) {
        return function() {
            onSubscribeHandle(channel)
        }
    }

    function renderDescription(description) {
        return (
            <div className = "video-view__description">
                 <p>{description}</p>
         </div>
        )
    }


    if (statusVideo === 'idle' || statusVideo === 'pending')
        return (
            <Icon loading name='spinner' size = 'huge' className = "search-view__spinner"  />
        )

    if (!video)
        return null;
 if(statusVideo === 'resolved')
    return (
        <div className="video-view">
        <div className="video-view__videobox">
            <iframe src={videoSrc} title="video player" className = "video-view__video" />
        </div>
        <div className="video-view__titlebox">
            <div className="video-view__titleinfo">               
            <h1 className = "video-view__title">{video.title}</h1>
            <p className="video-view__publishdate">{formatDate(video.publishedAt)}</p>
            </div>
            <div className = "video-view__shareinfo">
               <button className = "video-view__like" onClick = {isAuth ? onLikeHandle(video) : () => history.push('/login')}>                  
               <Icon  name='thumbs up' size = 'large'  />
               </button>
               <button className = {`video-view__subscribebtn ${currentSubscribeStatus && 'video-view__subscribebtn--active'}`} onClick = {isAuth ? onSubscribeClick(video.channel) : () => history.push('/login')}>Subscribe</button>
            </div>
        </div>
         <div className="video-view__info">
             <div className="video-view__channelbox">                
             <Link to = {`/channel/${video.channel.channelId}`} className="video-view__channelink">                 
                <img src = {video.channel.image} alt="Author image" className="video-view__channelimg" />
             </Link>
            <h3 className="video-view__channeluser">{video.channel.title}</h3>
             </div>
            <div className = "video-view__descriptionbox">            
            {descriptionShow?renderDescription(video.description):null}   
            <button type="button" className="video-view__descriptionbtn" onClick = {() => setDescriptionShow(!descriptionShow)}>{descriptionShow?'Show Less':'Show More'}</button>               
            </div>
         </div>                          
           <CommentView />
       </div>
    )
}

export default VideoView;

// <Embed
//     id={video.id}
//     placeholder={video.snippet.thumbnails.standard.url}
//     source='youtube'
//   />