import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Paragraph, ImageContainer, Image, ListGroup, Icon } from '../../design/components';
import { Menu } from '../../design/elements';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useCommentActions } from '../../stores/comment/commentActionContext';
import { MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
const CommentItem = ({ comment, setCurrentTypedComment, className }) => {
   const [open, setOpen] = useState(false);
   const { user } = useAuthState();
   const { deleteComment } = useCommentActions();
   const { videoId } = useParams();
   const anchorRef = useRef(null);

   function onDeleteClick(id) {
      return function () {
         deleteComment(videoId, id);
      };
   }

   function renderActionBtn(comment) {
      return (
         <ListGroup.Item>
            {/*<Button modifiers='seablue' onClick={() => setCurrentTypedComment(comment)}>
                           Edit
                        </Button>
                        <Button modifiers='primary' onClick={onDeleteClick(comment._id)}>
                           Delete
                        </Button>*/}

            <Button
               ref={anchorRef}
               onClick={() => setOpen((prev) => !prev)}
               modifiers='transparent'
            >
               <Icon as={MoreVert} />
            </Button>
            <Menu open={open} setOpen={setOpen} anchorRef={anchorRef}>
               <MenuItem onClick={() => setCurrentTypedComment(comment)}>Edit</MenuItem>
               <MenuItem onClick={onDeleteClick(comment._id)}>Delete</MenuItem>
            </Menu>
         </ListGroup.Item>
      );
   }

   return (
      <ListGroup flexy='center' className={className}>
         <ListGroup.Item width='5'>
            <ImageContainer>
               <Image
                  modifiers='round'
                  src={`http://127.0.0.1:8000/${comment.user.photo}`}
                  alt='User Image'
               />
            </ImageContainer>
         </ListGroup.Item>
         <ListGroup.Item width='85' spacing='2.5'>
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
`;
