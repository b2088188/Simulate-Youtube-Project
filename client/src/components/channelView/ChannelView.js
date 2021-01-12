import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ImageContainer, Image, Title, Button, ListGroup } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useChannelState } from '../../stores/channel/channelStateContext';
import { useChannelActions } from '../../stores/channel/channelActionContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import ChannelItem from './ChannelItem';
import { Spinner, Message } from '../../design/elements';
import axios from 'axios';

const ChannelView = ({ className }) => {
   const { user } = useAuthState();
   const { channel, channelVideos, statusChannel, errorChannel } = useChannelState();
   const { fetchChannel } = useChannelActions();
   const {
      getCurrentSubscribe,
      getUserSubscriptions,
      createSubscribe,
      deleteSubscribe
   } = useSubscribeActions();
   const { currentUserSub, stateCurrentSubscribe, errorCurrentSubscribe } = useSubscribeState();
   const { channelId } = useParams();
   const [toLogin, setToLogin] = useState(false);
   const isSubscribed = currentUserSub ? true : false;

   useEffect(() => {
      fetchChannel(axios.get(`/api/v1/channels/${channelId}/videos`));
   }, [channelId]);
   useEffect(() => {
      if (user && channel) getCurrentSubscribe(user._id, channel._id);
   }, [user, channel, getCurrentSubscribe]);

   function renderChannelVideos(list) {
      return list.map(function generateItem(video) {
         return <ChannelItem key={video._id} video={video} />;
      });
   }

   function onSubscribeHandle(isSubscribed, user, channel) {
      return function () {
         if (!isSubscribed) {
            createSubscribe(user._id, channel._id);
         } else {
            deleteSubscribe(user._id, channel._id);
         }
      };
   }
   if (toLogin) return <Redirect to='/login' />;

   if (statusChannel === 'idle' || statusChannel === 'pending') return <Spinner modifiers='dark' />;
   if (statusChannel === 'rejected' && errorChannel) return <Message text={errorChannel} />;
   if (statusChannel === 'resolved')
      return (
         <div className={className}>
            <div className='channel__info'>
               <div className='channel__userbox'>
                  <ImageContainer flexWidth='50'>
                     <Image modifiers='round' src={channel.image} />
                  </ImageContainer>
                  <Title modifiers={['medium', 'light']}>{channel.title}</Title>
               </div>
               <Button
                  modifiers={['light', `${isSubscribed ? 'disable' : 'outline'}`]}
                  onClick={
                     user ? onSubscribeHandle(isSubscribed, user, channel) : () => setToLogin(true)
                  }
               >
                  Subscribed
               </Button>
            </div>
            <ListGroup ycenter>{renderChannelVideos(channelVideos)}</ListGroup>
         </div>
      );
};

export default styled(ChannelView)`
   color: #fff;

   .channel {
      &__info {
         ${setFlex({ x: 'space-around', y: 'center' })}
         background-image: linear-gradient(to right bottom, var(--color-primary-light), var(--color-primary-dark));
         padding: 2rem 1rem;
      }

      &__userbox {
         flex: 0 0 15%;
         ${setFlex({ x: 'space-evenly', y: 'center' })}
      }
   }
`;
