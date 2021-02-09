import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
   FlexWrapper,
   List,
   Link as SLink,
   ImageContainer,
   Image,
   Title,
   ListGroup,
   Icon,
   Button,
   Span
} from '../../design/components';
import { colorGrey } from '../../design/utils';
import { Close, Delete } from '@material-ui/icons';
import { Modal, ModalOpenButton, ModalCloseButton, ModalContent } from '../../design/elements';
import { useRemoveLikeItem } from '../../utils/like';

const LikedItem = ({ like, className }) => {
   const { removeLike } = useRemoveLikeItem();

   return (
      <List.Item className={className}>
         <Modal>
            <ModalOpenButton>
               <Button modifiers='transparent' className='like__portalbtn'>
                  <Icon as={Close} />
               </Button>
            </ModalOpenButton>
            <ModalContent>
               <FlexWrapper direction='column' y='center'>
                  <Title>Are you sure you want to remove this item?</Title>
                  <ModalCloseButton>
                     <Button
                        modifiers='outline'
                        className='like__deletebtn'
                        onClick={() => removeLike({ videoId: like.videoId })}
                     >
                        <Icon as={Delete} />
                        <Span>Remove</Span>
                     </Button>
                  </ModalCloseButton>
               </FlexWrapper>
            </ModalContent>
         </Modal>
         <SLink as={Link} to={`/watch/${like.videoId}`}>
            <ListGroup flexy='center'>
               <ListGroup.Item width='20'>
                  <ImageContainer>
                     <Image src={like.image} alt={like.title} />
                  </ImageContainer>
               </ListGroup.Item>
               <ListGroup.Item width='75' mg={{ x: '1%' }}>
                  <Title as='h2' modifiers='small'>
                     {like.title}
                  </Title>
                  <Title as='h3' modifiers={['small', 'light']}>
                     {like.channelTitle}
                  </Title>
               </ListGroup.Item>
            </ListGroup>
         </SLink>
      </List.Item>
   );
};

export default styled(LikedItem)`
   position: relative;
   background: var(--color-grey-light-2);
   transition: background 0.25s;
   &:hover {
      background: var(--color-grey-light-3);
   }

   .like {
      &__window {
         text-align: center;
      }

      &__windowtitle {
         font-size: 1.7rem !important;
      }

      &__portalbtn {
         position: absolute;
         top: 0.5rem;
         right: 0.5rem;
      }
      &__deletebtn {
         color: ${colorGrey.dark2};
      }
   }
`;
