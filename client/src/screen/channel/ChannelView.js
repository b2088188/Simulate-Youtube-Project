import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useChannelInfo, useChannelVideos } from 'utils/channel';
import {
   useSubscribeItem,
   useCreateSubscribeItemInChannel,
   useRemoveSubscribeItemInChannel
} from 'utils/subscription';
import { useAsync } from 'utils/hooks';
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
} from 'design/components';
import { setFlex, media } from 'design/utils';
import useAuth from 'context/auth/authContext';
import ChannelItem from './ChannelItem';
import { AreaSpinner, Spinner } from 'components/Spinner';
import { Message } from 'components/Message';

const ChannelView = ({ className }) => {
   const [{ user }] = useAuth();
   const { channelId } = useParams();
   const {
      channel,
      isIdle: isChannelIdle,
      isLoading: isChannelLoading,
      isSuccess: isChannelSuccess
      // isError: isChannelError,
      //error: errorChannel
   } = useChannelInfo(channelId);
   const {
      channelVideos,
      isIdle: isChannelVideosIdle,
      isLoading: isChannelVideosLoading,
      isSuccess: isChannelVideosSuccess,
      isError: isChannelVideosError,
      error: errorChannelVideos
   } = useChannelVideos(channelId);
   const {
      isLoading: isMutateLoading,
      //isError: isMutateError,
      // error: errorMutate,
      run
      // reset
   } = useAsync();

   const subscribeItem = useSubscribeItem(channelId);
   const { createSubscribe } = useCreateSubscribeItemInChannel(channelId);
   const { removeSubscribe } = useRemoveSubscribeItemInChannel(channelId);
   const [toLogin, setToLogin] = useState(false);

   function renderChannelVideos(list) {
      return list.map(function generateItem(video) {
         return <ChannelItem key={video._id} video={video} />;
      });
   }

   function handleClick(clickCB) {
      return function () {
         run(clickCB());
      };
   }

   if (toLogin) return <Redirect to='/login' />;

   if (isChannelIdle || isChannelLoading)
      return (
         <Col width='10'>
            <AreaSpinner />
         </Col>
      );

   if (isChannelSuccess)
      return (
         <Col width='10' className={className}>
            <div className='channel__info'>
               <FlexWrapper y='center'>
                  <ImageContainer width='7.5rem'>
                     <Image modifiers='round' src={channel.image} />
                  </ImageContainer>
                  <div className='channel__titlebox'>
                     <Title modifiers={['medium', 'light']}>{channel.title}</Title>
                     <Span modifiers={['medium', 'exlight']}>{channel.subscribes} subscribers</Span>
                  </div>
               </FlexWrapper>
               {!isMutateLoading ? (
                  <Button
                     modifiers={['light', `${subscribeItem ? 'disable' : 'outline'}`]}
                     onClick={
                        user
                           ? !subscribeItem
                              ? handleClick(() => createSubscribe({ channel: channelId }))
                              : handleClick(() => removeSubscribe({ channelId }))
                           : () => setToLogin(true)
                     }
                  >
                     Subscribed
                  </Button>
               ) : (
                  <Spinner />
               )}
            </div>
            <ListGroup flexy='center' wrap='true'>
               {isChannelVideosIdle || isChannelVideosLoading ? (
                  <AreaSpinner />
               ) : isChannelVideosError && errorChannelVideos ? (
                  <Message severity='error' text={errorChannelVideos.message} />
               ) : isChannelVideosSuccess ? (
                  renderChannelVideos(channelVideos)
               ) : null}
            </ListGroup>
         </Col>
      );
};

export default styled(ChannelView)`
   color: #fff;
   .channel {
      &__info {
         ${setFlex({ x: 'space-between', y: 'center' })}
         background-image: linear-gradient(to right bottom, var(--color-primary-light), var(--color-primary-dark));
         padding: 2rem 20%;
         ${media.phone(`
            padding: .5rem 1rem;
            `)}
      }
      &__titlebox {
         margin-left: 0.5rem;
      }
   }
`;
