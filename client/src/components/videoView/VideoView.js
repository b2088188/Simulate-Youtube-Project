import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useVideoInfo } from '../../utils/video';
import {
   useSubscribeItem,
   useCreateSubscribeItem,
   useRemoveSubscribeItem
} from '../../utils/subscription';
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
import useVideo from '../../stores/video/videoContext';
import useLike from '../../stores/likes/likeContext';
import useSubscribe from '../../stores/subscriptions/subscribeContext';
import CommentView from '../commentView/CommentView';
import { ThumbUp } from '@material-ui/icons';
import { Message, Spinner } from '../../design/elements';

const VideoView = ({ history, className }) => {
   const { user } = useAuthState();
   const { videoId } = useParams();
   const { video, isIdle, isLoading, isSuccess, isError, error } = useVideoInfo(videoId);
   const [{ currentUserLike }, { getCurrentLike, createLike, deleteLike }] = useLike();
   const { create } = useCreateSubscribeItem(user);
   const { remove } = useRemoveSubscribeItem(user);
   const subscribeItem = useSubscribeItem(user, video?.channel?._id || null);
   const [descriptionShow, setDescriptionShow] = useState(false);
   const isLiked = currentUserLike ? true : false;
   const videoSrc = `https://www.youtube.com/embed/${videoId}`;

   // useEffect(() => {
   //    if (user) getCurrentLike(user._id, videoId);
   // }, [user, videoId, getCurrentLike]);

   function onLikeHandle(user, video) {
      // return async function () {
      //    if (!isLiked) {
      //       await createLike(user._id, video);
      //       videoLikeHandle('add');
      //    } else {
      //       await deleteLike(user._id, video.videoId);
      //       videoLikeHandle('delete');
      //    }
      // };
   }

   if (isIdle || isLoading) return <Spinner modifiers='dark' />;
   if (isError && error)
      return (
         <Col width='10'>
            <Message severity='error' text={error.message} />
         </Col>
      );
   if (isSuccess)
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
                        modifiers={[`${subscribeItem ? 'disable' : 'primary'}`]}
                        className='video__subscribebtn'
                        onClick={
                           user
                              ? !subscribeItem
                                 ? () => create(video.channel._id)
                                 : () => remove(video.channel._id)
                              : () => history.push('/login')
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
