import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Button, Paragraph, ImageContainer, Image, ListGroup, Icon, Span } from 'design/components';
import { setFlex } from 'design/utils';
import { Menu, MenuOpenButton, MenuContent, MenuItem } from 'components/Menu';
import useAuth from 'context/auth/authContext';
import { useDeleteComment } from 'utils/comment';
import { useCommentLikeItem, useCreateCommentLike, useRemoveCommentLike } from 'utils/commentLikes';
import { MoreVert, ThumbUp } from '@material-ui/icons';
import { formatDate } from 'utils/format';

const CommentItem = ({ comment, setCurrentTypedComment, sortBy }) => {
   const { videoId } = useParams();
   const [{ user }] = useAuth();
   const { remove } = useDeleteComment(videoId, sortBy);
   const commentLikeItem = useCommentLikeItem(comment._id);
   const { createCommentLike } = useCreateCommentLike(videoId, sortBy);
   const { removeCommentLike } = useRemoveCommentLike(videoId, sortBy);
   const [toLogin, setToLogin] = useState(false);

   function onCommentLikeHandle() {
      if (!user) return setToLogin(true);
      if (commentLikeItem)
         return removeCommentLike({ commentId: comment._id, likeId: commentLikeItem?._id });
      createCommentLike({ commentId: comment._id });
   }

   function renderActionBtn(comment) {
      return (
         <ListGroup.Item>
            <Menu>
               <MenuOpenButton>
                  <Button modifiers='transparent'>
                     <Icon as={MoreVert} />
                  </Button>
               </MenuOpenButton>
               <MenuContent>
                  <MenuItem onClick={() => setCurrentTypedComment(comment)}>Edit</MenuItem>
                  <MenuItem onClick={() => remove({ commentId: comment._id })}>Delete</MenuItem>
               </MenuContent>
            </Menu>
         </ListGroup.Item>
      );
   }

   if (toLogin) return <Redirect to='/login' />;

   return (
      <ListGroup
         flexy='center'
         css={`
            &:not(:last-child) {
               margin-bottom: 3rem;
            }
         `}
      >
         <ListGroup.Item width='5'>
            <ImageContainer>
               <Image
                  modifiers='round'
                  src={`${process.env.REACT_APP_BACKEND_URL}/${comment.user.photo}`}
                  alt='User Image'
               />
            </ImageContainer>
         </ListGroup.Item>
         <ListGroup.Item width='85' spacing='2.5'>
            <div
               css={`
                  ${setFlex({ y: 'center' })}
               `}
            >
               <Paragraph modifiers={['small', 'bold']}>{comment.user.name}</Paragraph>
               <Paragraph
                  modifiers='tini'
                  css={`
                     margin-left: 0.3rem;
                  `}
               >
                  {formatDate(comment.createdAt)}
               </Paragraph>
            </div>
            <Paragraph modifiers='small'>{comment.comment}</Paragraph>
            <div
               css={`
                  ${setFlex({ y: 'center' })}
               `}
            >
               <Button modifiers='transparent' onClick={onCommentLikeHandle}>
                  <Icon as={ThumbUp} modifiers={commentLikeItem ? 'secondary' : null} />
               </Button>
               <Span
                  css={`
                     margin-left: 0.3rem;
                  `}
               >
                  {comment.likes}
               </Span>
            </div>
         </ListGroup.Item>
         {user && user._id === comment.user._id ? renderActionBtn(comment) : null}
      </ListGroup>
   );
};

export default CommentItem;
