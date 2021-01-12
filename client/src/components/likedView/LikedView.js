import './likedview.scss';
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { List } from '../../design/components';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useLikeState } from '../../stores/likes/likeStateContext';
import { useLikeActions } from '../../stores/likes/likeActionContext';
import LikedItem from './LikedItem';
import { Spinner } from '../../design/elements';
import axios from 'axios';

const LikedView = ({ className }) => {
   const { user } = useAuthState();
   const {
      currentLike,
      userLikes,
      statusUserLikes,
      errorUserLikes,
   } = useLikeState();
   const { getUserLikes, dispatchLikes } = useLikeActions();

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
         <div className={className}>
            <nav className='like__nav'>
               <List>{renderLikeList(userLikes)}</List>
            </nav>
         </div>
      );
};

export default styled(LikedView)`
   width: 60%;
   margin: 2rem auto;
   .like {
      &__nav {
         @media only screen and (max-width: 56.25em) {
            flex: 0 0 80%;
         }
      }
   }
`;
