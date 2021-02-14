import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Paragraph, ImageContainer, Image, ListGroup, Icon } from 'design/components';
import { Menu, MenuOpenButton, MenuCloseButton, MenuContent, MenuItem } from 'components/Menu';
import useAuth from 'context/auth/authContext';
import { useDeleteComment } from 'utils/comment';
import { MoreVert } from '@material-ui/icons';

const CommentItem = ({ comment, setCurrentTypedComment, className }) => {
   const { videoId } = useParams();
   const [{ user }] = useAuth();
   const { remove } = useDeleteComment(videoId);

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
                  <MenuCloseButton>
                     <MenuItem onClick={() => setCurrentTypedComment(comment)}>Edit</MenuItem>
                  </MenuCloseButton>
                  <MenuCloseButton>
                     <MenuItem onClick={() => remove({ commentId: comment._id })}>Delete</MenuItem>
                  </MenuCloseButton>
               </MenuContent>
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
                  src={`${process.env.REACT_APP_BACKEND_URL}/${comment.user.photo}`}
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
