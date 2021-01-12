import React, { useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Paragraph, ImageContainer, Image, ListGroup } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useCommentState } from '../../stores/comment/commentStateContext';
import { useCommentActions } from '../../stores/comment/commentActionContext';
import axios from 'axios';

const CommentItem = ({ comment, setCurrentTypedComment, className }) => {
   const { user } = useAuthState();
   const { deleteComment, fetchComments } = useCommentActions();
   const { videoId } = useParams();

   function onDeleteClick(id) {
      return function () {
         deleteComment(videoId, id);
      };
   }

   function renderActionBtn(comment) {
      return (
         <ListGroup.Item p15 className='comment__actionbox'>
            <Button modifiers='seablue' onClick={() => setCurrentTypedComment(comment)}>
               Edit
            </Button>
            <Button modifiers='primary' onClick={onDeleteClick(comment._id)}>
               Delete
            </Button>
         </ListGroup.Item>
      );
   }

   return (
      <ListGroup ycenter className={className}>
         <ListGroup.Item p5>
            <ImageContainer>
               <Image
                  modifiers='round'
                  src={`http://127.0.0.1:8000/${comment.user.photo}`}
                  alt='User Image'
               />
            </ImageContainer>
         </ListGroup.Item>
         <ListGroup.Item p75 className='comment__commentbox'>
            <Paragraph modifiers={['small', 'bold']}>{comment.user.name}</Paragraph>
            <Paragraph modifiers='small'>{comment.comment}</Paragraph>
         </ListGroup.Item>
         {user && user._id === comment.user._id ? renderActionBtn(comment) : null}
      </ListGroup>
   );
};

export default styled(CommentItem)`
   &:not(:last-child) {
      margin-bottom: 3rem;
   }
   .comment {
      &__commentbox {
         margin: 0 2%;
      }
      &__actionbox {
         flex: 0 0 15%;
         ${setFlex({ x: 'space-evenly' })}
      }
   }
`;
