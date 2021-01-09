import './likedview.scss';
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { List } from '../../design/components';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useLikeState } from '../../stores/likes/likeStateContext';
import { useLikeActions } from '../../stores/likes/likeActionContext';
import LikedItem from './LikedItem';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';

const LikedView = ({ className }) => {
  const { user } = useAuthState();
  const { likes, statusLikes, errorLikes } = useLikeState();
  const { fetchLikes } = useLikeActions();

  useEffect(() => {
    fetchLikes(axios.get(`/api/v1/users/${user._id}/likes`));
  }, [fetchLikes, user]);

  function renderLikeList(list) {
    return list?.map(function generateItem(like) {
      return <LikedItem like={like} key={like._id} />;
    });
  }

  if (statusLikes === 'idle' || statusLikes === 'pending')
    return <Spinner classStyle='center' />;
  if (statusLikes === 'resolved')
    return (
      <div className={className}>
        <nav className='like__nav'>
          <List>{renderLikeList(likes)}</List>
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
