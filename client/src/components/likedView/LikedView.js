import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Col, List } from '../../design/components';
import { media } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useLikeState } from '../../stores/likes/likeStateContext';
import { useLikeActions } from '../../stores/likes/likeActionContext';
import LikedItem from './LikedItem';
import { Spinner } from '../../design/elements';
import axios from 'axios';

const LikedView = ({ className }) => {
   const { user } = useAuthState();
   const { userLikes, statusUserLikes, errorUserLikes } = useLikeState();
   const { getUserLikes } = useLikeActions();

   useEffect(() => {
      if (user) getUserLikes(user.id);
   }, [user]);

   function renderLikeList(list) {
      return list?.map(function generateItem(like) {
         return <LikedItem like={like} key={like._id} />;
      });
   }

   if (statusUserLikes === 'idle' || statusUserLikes === 'pending')
      return <Spinner modifiers='dark' />;
   if (statusUserLikes === 'resolved')
      return (
         <Col width='10' className={className}>
            <div className='like'>
               <nav>
                  <List>{renderLikeList(userLikes)}</List>
               </nav>
            </div>
         </Col>
      );
};

export default styled(LikedView)`
   .like {
      width: 60%;
      margin: 2rem auto;
      ${media.tabland(`
      width: 70%;
      `)}
      ${media.tabport(`
      width: 90%;
      `)}
   }
`;
