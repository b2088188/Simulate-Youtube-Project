import React, { useEffect } from 'react';
import { Col, CenterWrapper, List } from '../../design/components';
import { useAuthState } from '../../stores/auth/authStateContext';
import useLike from '../../stores/likes/likeContext';
import LikedItem from './LikedItem';
import { Spinner, Message } from '../../design/elements';

const LikedView = ({ className }) => {
   const { user } = useAuthState();
   const [{ userLikes, statusUserLikes, errorUserLikes }, { getUserLikes }] = useLike();

   useEffect(() => {
      if (user) getUserLikes(user._id);
   }, [user, getUserLikes]);

   function renderLikeList(list) {
      return list?.map(function generateItem(like) {
         return <LikedItem like={like} key={like._id} />;
      });
   }

   if (statusUserLikes === 'idle' || statusUserLikes === 'pending')
      return <Spinner modifiers='dark' />;
   if (statusUserLikes === 'rejected' && errorUserLikes)
      return (
         <Col width='10'>
            <Message severity='error' text={errorUserLikes} />
         </Col>
      );
   if (statusUserLikes === 'resolved')
      return (
         <Col width='10' className={className}>
            <CenterWrapper width={{ desktop: '60', tabland: '70', tabport: '90' }} my='2'>
               <nav>
                  <List>{renderLikeList(userLikes)}</List>
               </nav>
            </CenterWrapper>
         </Col>
      );
};

export default LikedView;
