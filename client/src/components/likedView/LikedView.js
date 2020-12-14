import './likedview.scss';
import React, { useEffect, useContext } from 'react';
import LikedItem from './LikedItem';
import LikeContext from '../../stores/likes/likeContext';
import Spinner from '../../utils/spinner/Spinner';

const LikedView = () => {
    const { likes, getLikes, loading } = useContext(LikeContext);

    useEffect(() => {
        getLikes();
    }, [])

    function renderLikeList(list) {
        return list.map(function generateItem(like) {
            return <LikedItem like = {like} key = {like._id} />
        })
    }

    if (loading)
        return (
            <Spinner classStyle = "center" />
        );

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