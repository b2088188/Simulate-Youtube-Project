import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
   Col,
   FlexWrapper,
   ImageContainer,
   Image,
   Title,
   Button,
   ListGroup,
   Span
} from '../../design/components';
import { setFlex, media } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useChannelState } from '../../stores/channel/channelStateContext';
import { useChannelActions } from '../../stores/channel/channelActionContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import ChannelItem from './ChannelItem';
import { Spinner, Message } from '../../design/elements';

const ChannelView = ({ className }) => {
   const { user } = useAuthState();
   const { channel, channelVideos, statusChannel, errorChannel } = useChannelState();
   const { getChannelVideos, channelSubscribeHandle } = useChannelActions();
   const { getCurrentSubscribe, createSubscribe, deleteSubscribe } = useSubscribeActions();
   const { currentUserSub } = useSubscribeState();
   const { channelId } = useParams();
   const [toLogin, setToLogin] = useState(false);
   const isSubscribed = currentUserSub ? true : false;

   useEffect(() => {
      getChannelVideos(channelId);
   }, [channelId, getChannelVideos]);
   useEffect(() => {
      if (user && channel) getCurrentSubscribe(user._id, channel._id);
   }, [user, channel, getCurrentSubscribe]);

   function onSubscribeHandle(isSubscribed, user, channel) {
      return async function () {
         if (!isSubscribed) {
            await createSubscribe(user._id, channel._id);
            channelSubscribeHandle('add');
         } else {
            await deleteSubscribe(user._id, channel._id);
            channelSubscribeHandle('delete');
         }
      };
   }
   function renderChannelVideos(list) {
      return list.map(function generateItem(video) {
         return <ChannelItem key={video._id} video={video} />;
      });
   }
   if (toLogin) return <Redirect to='/login' />;

   if (statusChannel === 'idle' || statusChannel === 'pending') return <Spinner modifiers='dark' />;
   if (statusChannel === 'rejected' && errorChannel)
      return (
         <Col width='10'>
            <Message text={errorChannel} severity='error' />;
         </Col>
      );

   if (statusChannel === 'resolved')
      return (
         <Col width='10' className={className}>
            <div className='channel__info'>
               <FlexWrapper y='center'>
                  <ImageContainer width='7.5rem'>
                     <Image modifiers='round' src={channel.image} />
                  </ImageContainer>
                  <div>
                     <Title modifiers={['medium', 'light']}>{channel.title}</Title>
                     <Span modifiers={['medium', 'exlight']}>{channel.subscribes} subscribers</Span>
                  </div>
               </FlexWrapper>
               <Button
                  modifiers={['light', `${isSubscribed ? 'disable' : 'outline'}`]}
                  onClick={
                     user ? onSubscribeHandle(isSubscribed, user, channel) : () => setToLogin(true)
                  }
               >
                  Subscribed
               </Button>
            </div>
            <ListGroup flexy='center' wrap='true'>
               {renderChannelVideos(channelVideos)}
            </ListGroup>
         </Col>
      );
};

export default styled(ChannelView)`
   color: #fff;
   .channel {
      &__info {
         ${setFlex({ x: 'space-around', y: 'center' })}
         background-image: linear-gradient(to right bottom, var(--color-primary-light), var(--color-primary-dark));
         padding: 2rem 1rem;
         ${media.phone(`
            padding: .5rem 1rem;
            `)}
      }
   }
`;
