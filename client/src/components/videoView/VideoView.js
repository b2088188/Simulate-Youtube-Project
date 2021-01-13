import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
   ImageContainer,
   Link as SLink,
   Video,
   Title,
   Paragraph,
   ListGroup,
   Button,
   Icon,
   Image,
   Span
} from '../../design/components';
import { setFlex, colorGrey } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useVideoState } from '../../stores/video/videoStateContext';
import { useVideoActions } from '../../stores/video/videoActionContext';
import { useLikeState } from '../../stores/likes/likeStateContext';
import { useLikeActions } from '../../stores/likes/likeActionContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import CommentView from '../commentView/CommentView';
import { Embed } from 'semantic-ui-react';
import { ThumbUp } from '@material-ui/icons';
import { Accordion } from 'semantic-ui-react';
import { formatDate } from '../../utils/Format';
import axios from 'axios';
import { Message, Spinner } from '../../design/elements';

const VideoView = ({ history, className }) => {
   const { user } = useAuthState();
   const { videoId } = useParams();
   const { video, statusVideo, errorVideo } = useVideoState();
   const { getVideoById, videoLikeHandle, videoSubscribeHandle } = useVideoActions();
   const { userLikes, currentUserLike, statusUserLikes, errorUserLikes } = useLikeState();
   const { getCurrentLike, createLike, deleteLike } = useLikeActions();
   const {
      getCurrentSubscribe,
      getUserSubscriptions,
      createSubscribe,
      deleteSubscribe
   } = useSubscribeActions();
   const { currentUserSub, statusUserSubscriptions, errorUserSubscriptions } = useSubscribeState();
   const { fetchSubs } = useSubscribeActions();
   const [descriptionShow, setDescriptionShow] = useState(false);
   const isSubscribed = currentUserSub ? true : false;
   const isLiked = currentUserLike ? true : false;
   const videoSrc = `https://www.youtube.com/embed/${videoId}`;

   useEffect(() => {
      getVideoById(videoId);
   }, [videoId, getVideoById]);

   useEffect(() => {
      if (user) getCurrentLike(user._id, videoId);
   }, [user, videoId, getCurrentLike]);

   useEffect(() => {
      if (user && video) getCurrentSubscribe(user._id, video.channel._id);
   }, [user, video, getCurrentSubscribe]);

   function onLikeHandle(user, video) {
      return async function () {
         if (!isLiked) {
            await createLike(user._id, video);
            videoLikeHandle('add');
         } else {
            await deleteLike(video.videoId);
            videoLikeHandle('delete');
         }
      };
   }
   function onSubscribeHandle(user, video) {
      return async function () {
         if (!isSubscribed) {
            await createSubscribe(user._id, video.channel._id);
            videoSubscribeHandle('add');
         } else {
            await deleteSubscribe(user._id, video.channel._id);
            videoSubscribeHandle('delete');
         }
      };
   }

   if (statusVideo === 'idle' || statusVideo === 'pending') return <Spinner modifiers='dark' />;
   if (statusVideo === 'rejected' && errorVideo) return <Message text={errorVideo} />;
   if (statusVideo === 'resolved')
      return (
         <div className={className}>
            <div className='video__videobox'>
               <Video src={videoSrc} title='video player' />
            </div>
            <ListGroup ycenter className='video__titlebox'>
               <ListGroup.Item p70>
                  <Title modifiers='medium'>{video.title}</Title>
                  <Paragraph modifiers='small'>{formatDate(video.publishedAt)}</Paragraph>
               </ListGroup.Item>
               <ListGroup.Item p30 className='video__shareinfo'>
                  <Button
                     modifiers='transparent'
                     className='video__likebtn'
                     onClick={user ? onLikeHandle(user, video) : () => history.push('/login')}
                  >
                     <Icon as={ThumbUp} modifiers={`${isLiked ? 'secondary' : null}`} />
                  </Button>
                  <Span modifiers={['medium', 'regular']}>{video.likes}</Span>
                  <Button
                     modifiers={[`${isSubscribed ? 'disable' : 'primary'}`]}
                     className='video__subscribebtn'
                     onClick={user ? onSubscribeHandle(user, video) : () => history.push('/login')}
                  >
                     Subscribe
                  </Button>
               </ListGroup.Item>
            </ListGroup>
            <ListGroup modifiers='vertical' className='video__info'>
               <ListGroup.Item className='video__channelbox'>
                  <SLink
                     as={Link}
                     className='video__channellink'
                     to={`/channel/${video.channel._id}`}
                  >
                     <ImageContainer>
                        <Image modifiers='round' src={video.channel.image} alt='Author image' />
                     </ImageContainer>
                  </SLink>
                  <div>
                     <Title as='h2' modifiers='bold'>
                        {video.channel.title}
                     </Title>
                     <Span>{video.channel.subscribes} subscribers</Span>
                  </div>
               </ListGroup.Item>
               <ListGroup.Item>
                  {descriptionShow ? (
                     <Paragraph modifiers='small'>{video.description}</Paragraph>
                  ) : null}
                  <Button
                     modifiers={['medium', 'transparent']}
                     onClick={() => setDescriptionShow(!descriptionShow)}
                  >
                     {descriptionShow ? 'Show Less' : 'Show More'}
                  </Button>
               </ListGroup.Item>
            </ListGroup>
            <CommentView />
         </div>
      );
};

export default styled(VideoView)`
   width: 80%;
   margin: 0 auto;
   padding: 2rem 0rem;
   .video {
      &__videobox {
         box-shadow: var(--shadow-dark-shallow);
         height: 70rem;
         @media only screen and (max-width: 56.25em) {
            height: 50rem;
         }

         @media only screen and (max-width: 37.5em) {
            height: 35rem;
         }
      }

      &__titlebox {
         border-bottom: solid 0.1rem #000;
         padding: 2rem 1rem;
         @media only screen and (max-width: 56.25em) {
            flex: 0 0 90%;
            padding: 1rem 0;
         }
      }

      &__shareinfo {
         ${setFlex({ y: 'center' })}
      }

      &__likebtn {
         padding: 0;
         padding-top: 0.2rem;
         flex: 0 0 5%;
      }

      &__subscribebtn {
         flex: 0 0 15%;
         margin-left: 2.5%;
      }

      &__info {
         padding: 2rem 0;
         border-bottom: solid 0.1rem #000;
         @media only screen and (max-width: 56.25em) {
            flex: 0 0 90%;
            padding: 1rem 0;
         }
      }

      &__channelbox {
         ${setFlex({ y: 'center' })}
         margin-bottom: .5rem;
      }
      &__channellink {
         flex: 0 0 5%;
         margin-right: 1rem;
      }
   }
`;
