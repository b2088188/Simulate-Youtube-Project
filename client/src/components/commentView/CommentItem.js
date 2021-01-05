import React, { useEffect, useContext, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useCommentState} from '../../stores/comment/commentStateContext';
import {useCommentActions} from '../../stores/comment/commentActionContext';
import axios from 'axios';

const CommentItem = ({
    comment,
    setCurrentComment
}) => {
    const {user} = useAuthState();
    const {fetchComment, fetchComments} = useCommentActions();
    const {videoId} = useParams();


    function onDeleteClick(id) {
        return function() {
           fetchComment(axios.delete( `/api/v1/videos/${videoId}/comments/${id}`));
        }
    }

    function renderActionBtn(comment) {        
        return (
            <Fragment>              
                    <button className = "comment-view__btn comment-view__btn--edit" onClick = {() => setCurrentComment(comment)} >Edit</button>
                    <button className = "comment-view__btn comment-view__btn--delete" onClick = {onDeleteClick(comment._id)}>Delete</button>
            </Fragment>
        )
    }


    return (
        <div className = "comment-view__box">
                {/*<img src = {require(`../../../../public/assets/users/default.jpg`).default}  alt="User 1" className = "comment-view__photo"/>*/}
                   <div className = "comment-view__user-box">
                       <p className = "comment-view__user-name">{comment.name}</p>
                       <p className = "comment-view__user-comment">{comment.comment}</p>                       
                    </div>
                    {user&&user._id === comment.user._id ? 
                    renderActionBtn(comment) : 
                    null}                       
      </div>
    )
}

export default CommentItem;