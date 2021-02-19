import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useVideoInfo } from 'utils/video';
import {
   useSubscribeItem,
   useCreateSubscribeItemInVideo,
   useRemoveSubscribeItemInVideo
} from 'utils/subscription';
import { useLikeItem, useCreateLikeItemInVideo, useRemoveLikeItemInVideo } from 'utils/like';
import { useAsync } from 'utils/hooks';
import styled from 'styled-components/macro';
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
} from 'design/components';
import { media } from 'design/utils';
import useAuth from 'context/auth/authContext';
import CommentView from 'screen/comment/CommentView';
import { ThumbUp } from '@material-ui/icons';
import { AreaSpinner, Spinner } from 'components/Spinner';

const VideoView = () => {
   const { videoId } = useParams();
   const history = useHistory();
   const [{ user }] = useAuth();
   const { video, isIdle, isLoading, isSuccess } = useVideoInfo(videoId);
   const likeItem = useLikeItem(videoId);
   const {
      isLoading: isMutateLoading,
      //isError: isMutateError,
      //error: errorMutate,
      run
      //  reset
   } = useAsync();

   const { createSubscribe } = useCreateSubscribeItemInVideo(videoId);
   const { removeSubscribe } = useRemoveSubscribeItemInVideo(videoId);
   const { createLike } = useCreateLikeItemInVideo(videoId);
   const { removeLike } = useRemoveLikeItemInVideo(videoId);
   const subscribeItem = useSubscribeItem(video?.channel?._id || null);
   const [descriptionShow, setDescriptionShow] = useState(false);
   const videoSrc = `https://www.youtube.com/embed/${videoId}`;

   function handleSubscribeClick(clickCB) {
      return function () {
         run(clickCB());
      };
   }

   if (isIdle || isLoading)
      return (
         <Col width='10'>
            <AreaSpinner />
         </Col>
      );
   if (isSuccess)
      return (
         <Col width='10'>
            <div
               css={`
                  width: 80%;
                  margin: 0 auto;
                  padding: 2rem 0rem;
                  ${media.tabport(`
                  width: 90%;
                  `)}
               `}
            >
               <div
                  css={`
                     box-shadow: var(--shadow-dark-shallow);
                     height: 37.5vw;
                     ${media.tabport(`
                        height: 45vw;
                        `)}
                  `}
               >
                  <Video src={videoSrc} title='video player' />
               </div>
               <ListGroup
                  flexy='center'
                  css={`
                     border-bottom: solid 0.1rem #000;
                     padding: 2rem 1rem;
                  `}
               >
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
                        css={`
                           padding: 0;
                        `}
                        onClick={
                           user
                              ? !likeItem
                                 ? () => createLike(video)
                                 : () => removeLike({ videoId })
                              : () => history.push('/login')
                        }
                     >
                        <Icon as={ThumbUp} modifiers={`${likeItem ? 'secondary' : null}`} />
                     </Button>
                     <Span modifiers={['medium', 'regular']}>{video.likes}</Span>
                     {isMutateLoading ? (
                        <Spinner />
                     ) : (
                        <Button
                           modifiers={[`${subscribeItem ? 'disable' : 'primary'}`]}
                           css={`
                              flex: 0 0 15%;
                              margin-left: 2.5%;
                           `}
                           onClick={
                              user
                                 ? !subscribeItem
                                    ? handleSubscribeClick(() =>
                                         createSubscribe({ channel: video.channel._id })
                                      )
                                    : handleSubscribeClick(() =>
                                         removeSubscribe({ channelId: video.channel._id })
                                      )
                                 : () => history.push('/login')
                           }
                        >
                           Subscribe
                        </Button>
                     )}
                  </ListGroup.Item>
               </ListGroup>
               <ListGroup
                  css={`
                     padding: 2rem 0;
                     border-bottom: solid 0.1rem #000;
                  `}
               >
                  <ListGroup.Item
                     flexy='center'
                     css={`
                        margin-bottom: 0.5rem;
                     `}
                  >
                     <SLink
                        as={Link}
                        css={`
                           flex: 0 0 5%;
                           margin-right: 1rem;
                        `}
                        to={`/channel/${video.channel._id}`}
                     >
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

export default VideoView;
