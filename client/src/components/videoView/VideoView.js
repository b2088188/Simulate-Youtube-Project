import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
   Col,
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
import { media } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useVideoState } from '../../stores/video/videoStateContext';
import { useVideoActions } from '../../stores/video/videoActionContext';
import { useLikeState } from '../../stores/likes/likeStateContext';
import { useLikeActions } from '../../stores/likes/likeActionContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import CommentView from '../commentView/CommentView';
import { ThumbUp } from '@material-ui/icons';
import { Message, Spinner } from '../../design/elements';

const VideoView = ({ history, className }) => {
   const { user } = useAuthState();
   const { videoId } = useParams();
   const { video, statusVideo, errorVideo } = useVideoState();
   const { getVideoById, videoLikeHandle, videoSubscribeHandle } = useVideoActions();
   const { currentUserLike } = useLikeState();
   const { getCurrentLike, createLike, deleteLike } = useLikeActions();
   const { getCurrentSubscribe, createSubscribe, deleteSubscribe } = useSubscribeActions();
   const { currentUserSub } = useSubscribeState();
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
   if (statusVideo === 'rejected' && errorVideo)
      return (
         <Col width='10'>
            <Message severity='error' text={errorVideo} />
         </Col>
      );
   if (statusVideo === 'resolved')
      return (
         <Col width='10' className={className}>
            <div className='video'>
               <div className='video__videobox'>
                  <Video src={videoSrc} title='video player' />
               </div>
               <ListGroup flexy='center' className='video__titlebox'>
                  <ListGroup.Item width='70'>
                     <Title modifiers='medium'>{video.title}</Title>
                     <Paragraph modifiers='small'>
                        {new Date(video.createdAt).toLocaleDateString('en-US', {
                           year: 'numeric',
                           month: 'long',
                           day: 'numeric'
                        })}{' '}
                        • {video.views} views
                     </Paragraph>
                  </ListGroup.Item>
                  <ListGroup.Item flexy='center'>
                     <Button
                        modifiers='transparent'
                        pd='0'
                        onClick={user ? onLikeHandle(user, video) : () => history.push('/login')}
                     >
                        <Icon as={ThumbUp} modifiers={`${isLiked ? 'secondary' : null}`} />
                     </Button>
                     <Span modifiers={['medium', 'regular']}>{video.likes}</Span>
                     <Button
                        modifiers={[`${isSubscribed ? 'disable' : 'primary'}`]}
                        className='video__subscribebtn'
                        onClick={
                           user ? onSubscribeHandle(user, video) : () => history.push('/login')
                        }
                     >
                        Subscribe
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
               <ListGroup modifiers='vertical' className='video__info'>
                  <ListGroup.Item flexy='center' mb='0.5rem'>
                     <SLink as={Link} flexwidth='5' mr='1rem' to={`/channel/${video.channel._id}`}>
                        <ImageContainer>
                           <Image modifiers='round' src={video.channel.image} alt='Author image' />
                        </ImageContainer>
                     </SLink>
                     <div>
                        <Title as='h2' modifiers='regular'>
                           {video.channel.title}
                        </Title>
                        <Span modifiers='medium'>{video.channel.subscribes} subscribers</Span>
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
         </Col>
      );
};

export default styled(VideoView)`
   .video {
      width: 80%;
      margin: 0 auto;
      padding: 2rem 0rem;
      ${media.tabport(`
      width: 90%;
      `)}

      &__videobox {
         box-shadow: var(--shadow-dark-shallow);
         height: 37.5vw;
         ${media.tabport(`
      height: 45vw;
      `)}
      }

      &__titlebox {
         border-bottom: solid 0.1rem #000;
         padding: 2rem 1rem;
      }

      &__subscribebtn {
         flex: 0 0 15%;
         margin-left: 2.5%;
      }

      &__info {
         padding: 2rem 0;
         border-bottom: solid 0.1rem #000;
      }
   }
`;
