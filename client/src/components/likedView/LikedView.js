import './likedview.scss';
import React, { useEffect, useContext } from 'react';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useLikeState} from '../../stores/likes/likeStateContext';
import {useLikeActions} from '../../stores/likes/likeActionContext';
import LikedItem from './LikedItem';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';

const LikedView = () => {
    const {user} = useAuthState();
    const {likes, statusLikes, errorLikes} = useLikeState();
    const {fetchLikes} = useLikeActions();

    useEffect(() => {
        fetchLikes(axios.get(`/api/v1/users/${user._id}/likes`));
    }, [fetchLikes, user])



    function renderLikeList(list) {
        return list?.map(function generateItem(like) {
            return <LikedItem like = {like} key = {like._id} />
        })
    }

    if (statusLikes === 'idle' || statusLikes === 'pending')
        return (
            <Spinner classStyle = "center" />
        );
    if(statusLikes === 'resolved')
    return (
        <div className = "liked-view">
        <nav className = "liked-view__nav">
            <ul className = "liked-view__list">
             {renderLikeList(likes)}
            </ul>
        </nav>
     </div>
    )
}

export default LikedView;