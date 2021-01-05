import './videoview.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useVideoState} from '../../stores/video/videoStateContext';
import {useVideoActions} from '../../stores/video/videoActionContext';
import {useLikeState} from '../../stores/likes/likeStateContext';
import {useLikeActions} from '../../stores/likes/likeActionContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import CommentView from '../commentView/CommentView';
import { Embed } from 'semantic-ui-react';
import { Icon, Accordion } from 'semantic-ui-react';
import { formatDate } from '../../utils/Format';
import axios from 'axios';

//  let likeItem = {
    //         videoId: video.id,
    //         channelId: video.snippet.channelId,
    //         title: video.snippet.title,
    //         channelTitle: video.snippet.channelTitle,
    //         image: video.snippet.thumbnails.high.url,
    //         publishDate: video.snippet.publishedAt
    //  }
    //     const {data}  = await axios.post('/api/v1/likes', likeItem, config.current);
    //     dispatch({
    //      type: CREATE_LIKE,
    //      payload: {
    //          like: data.data.like
    //      }
    //     })


const VideoView = ({
    history
}) => {
    const {user} = useAuthState();
    const {videoId} = useParams();
    const { video, statusVideo, errorVideo} = useVideoState();
    const {fetchVideo} = useVideoActions();
    const {likes, like, statusLikes, statusLike} = useLikeState();
    const {fetchLikes, fetchLike} = useLikeActions();
    //const { currentLikeStatus, checkLikeStatus, createLikeItem, deleteLikeItem, setLikeStatus } = useContext(LikeContext);
    const { currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle } = useContext(SubscribeContext);
    const [descriptionShow, setDescriptionShow] = useState(false);
    const [statusCurrentLike, setStatusCurrentLike] = useState(null);
    useEffect(() => {
        fetchVideo(axios.get(`/api/v1/videos/${videoId}`))
    }, [videoId,  fetchVideo, fetchLikes])

    useEffect(() => {
        if(user)
            fetchLike(axios.get(`/api/v1/users/${user._id}/likes/${videoId}`))
    }, [user, videoId])

    useEffect(() => {
        console.log(statusLike)
        if(statusLike === 'resolved')
            setStatusCurrentLike(like ? true : false);
    }, [statusLike])

    // useEffect(() => {
    //     if (channel)
    //         checkSubscribeStatus(channel.id);
    // }, [channel])

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;


    function onLikeHandle(video) {
        return function() {
            if(!statusCurrentLike) {
            fetchLikes(axios.post(`/api/v1/users/${user._id}/likes`, {
           videoId: video.videoId,
           title: video.title,
           channelId: video.channel.channelId,
           channelTitle: video.channel.title,
           image: video.images,
           publishedAt: video.publishedAt
               }))
          setStatusCurrentLike(true);    
           }
        else{
              fetchLikes(axios.delete(`/api/v1/users/${user._id}/likes/${video.videoId}`))
              setStatusCurrentLike(null);            
        }
   }
    }

    function onSubscribeClick(channel) {
        return function() {
            onSubscribeHandle(channel)
        }
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
               <button className = "video-view__like" onClick = {user ? onLikeHandle(video) : () => history.push('/login')}>                  
               <Icon  name='thumbs up' size = 'large'  />
               </button>
               <button className = {`video-view__subscribebtn ${currentSubscribeStatus && 'video-view__subscribebtn--active'}`} onClick = {user ? onSubscribeClick(video.channel) : () => history.push('/login')}>Subscribe</button>
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
            {descriptionShow ? 
                (<div className = "video-view__description">
                 <p>{video.description}</p>
                </div>) : 
                null}   
            <button type="button" className="video-view__descriptionbtn" onClick = {() => setDescriptionShow(!descriptionShow)}>{descriptionShow?'Show Less':'Show More'}</button>               
            </div>
         </div>                          
           <CommentView />
       </div>
    )
}

export default VideoView;
