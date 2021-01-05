import './commentview.scss'
import * as R from 'ramda';
import React, { useState, useEffect} from 'react';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useCommentState} from '../../stores/comment/commentStateContext';
import {useCommentActions} from '../../stores/comment/commentActionContext';
import {addComment} from '../../stores/comment/CommentStore';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import Spinner from '../../design/elements/Spinner';
import axios from 'axios';


const CommentView = () => {
    const {user} = useAuthState();
    const {comments, statusComments, statusComment, errorComments} = useCommentState();
    const { register, handleSubmit, errors, setValue, reset} = useForm();
    const {fetchComments, fetchComment} = useCommentActions();    
    const [currentComment, setCurrentComment] = useState(null);
    const [showActionBtn, setShowActionBtn] = useState(false);
    let { videoId } = useParams();



    useEffect(() => {
        if (currentComment)  
            setValue('comment', currentComment.comment);
    }, [currentComment])


    function onCancelClick() {
        reset();
        setCurrentComment(null);
    }

  async function onCreate(values) {
       fetchComment(axios.post(`/api/v1/videos/${videoId}/comments`, values))       
       setCurrentComment(null);
   }

   function onUpdate(values) {
       fetchComment(axios.patch(`/api/v1/videos/${videoId}/comments/${currentComment._id}`, values))       
       setCurrentComment(null);
   }

    function renderComments(list) {
        return list?.map(function generateItem(comment) {
            return (
                <CommentItem key = {comment._id} comment = {comment} setCurrentComment = {setCurrentComment} />
            )
        })
    }

    console.log(currentComment)

    if(statusComments === 'idle' || statusComments === 'pending')
        return <Spinner />

    if(statusComments === 'resolved')
    return (
        <div className="comment-view">
           {user ? 
            (<form className = "comment-view__form" onSubmit = {handleSubmit(!currentComment ? onCreate : onUpdate)}>
              <input type="text" name = "comment" placeholder = "Add a public comment..." className = "comment-view__input"  ref = {
                register({
                    required: 'Please type your comment'
                })
              } />
              <div className = "comment-view__submitbox">
                <button type="reset" className = "comment-view__btn comment-view__btn--cancel" onClick = {onCancelClick}>Cancel</button>
               <button className = "comment-view__btn comment-view__btn--comment">Comment</button>
               </div>
           </form>) :
            null}
           <div className = "comment-view__container">
              {renderComments(comments)}
           </div>
         </div>
    )
}

export default CommentView;