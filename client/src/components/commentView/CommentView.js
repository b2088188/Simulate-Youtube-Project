import './commentview.scss'
import * as R from 'ramda';
import React, { useState, useEffect} from 'react';
import {useCommentState} from '../../stores/comment/commentStateContext';
import {useCommentActions} from '../../stores/comment/commentActionContext';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';


const CommentView = () => {
    const { register, handleSubmit, errors, setValue, reset, unregister } = useForm();
    const {comments, statusComments, errorComments} = useCommentState();
    const {fetchComments} = useCommentActions();
    //const {getComments, addComment, updateComment, current, clearCurrent } = useContext(CommentContext);
    const [showActionBtn, setShowActionBtn] = useState(false);
    let { videoId } = useParams();
    useEffect(() => {
        fetchComments(axios.get(`/api/v1/videos/${videoId}/comments`))
    }, [videoId])


    // useEffect(() => {
    //     if (current) {
    //         setShowActionBtn(true);
    //         setValue('comment', current.comment);
    //     }
    // }, [current])

    function onCreateSubmit(values) {
        // addComment(values);
        // setShowActionBtn(false);
        // reset();
    }

    const onUpdateSubmit = R.curry(function(current, values) {
        // updateComment(current._id, values);
        // setShowActionBtn(false);
        // reset();
        // clearCurrent();
    }, 2);

    function onCancelClick() {
        // setShowActionBtn(false);
        // reset();
        // clearCurrent();
    }

    function renderActionBtn() {
        // return (
        //     <div className = "comment-view__submitbox">
        //        <button type="reset" className = "comment-view__btn comment-view__btn--cancel" onClick = {onCancelClick}>Cancel</button>
        //        <button className = "comment-view__btn comment-view__btn--comment">Comment</button>
        //       </div>
        // )
    }

    function renderComments(list) {
        return list?.map(function generateItem(comment) {
            return (
                <CommentItem key = {comment._id} comment = {comment} />
            )
        })
    }

    if(statusComments === 'idle' || statusComments === 'pending')
        return <Spinner />

    if(statusComments === 'resolved')
    return (
        <div className="comment-view">
           <form className = "comment-view__form" onSubmit = {handleSubmit(/*!current ? onCreateSubmit : onUpdateSubmit(current)*/)}>
              <input type="text" name = "comment" placeholder = "Add a public comment..." className = "comment-view__input" onFocus = {() => setShowActionBtn(true)}  ref = {
                register({
                    required: 'Please type your comment'
                })
              } />
              {showActionBtn&&renderActionBtn()}
           </form>
           <div className = "comment-view__container">
              {renderComments(comments)}
           </div>
         </div>
    )
}

export default CommentView;