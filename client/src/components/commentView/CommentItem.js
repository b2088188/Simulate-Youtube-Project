import React, { useContext, Fragment } from 'react';
import AuthContext from '../../stores/auth/authContext';
//import CommentContext from '../../stores/comment/commentContext';

const CommentItem = ({
    comment
}) => {
    const { user } = useContext(AuthContext);
    //const { deleteComment, setCurrent } = useContext(CommentContext);


    function onDeleteClick(id) {
        return function() {
            //deleteComment(id);
        }
    }

    function renderActionBtn(comment) {
        return null;
        // return (
        //     <Fragment>              
        //             <button className = "comment-view__btn comment-view__btn--edit" onClick = {setCurrent(comment)} >Edit</button>
        //             <button className = "comment-view__btn comment-view__btn--delete" onClick = {onDeleteClick(comment._id)}>Delete</button>
        //     </Fragment>
        // )
    }


    return (
        <div className = "comment-view__box">
                {/*<img src = {require(`../../../../public/assets/users/${user.photo}`).default}  alt="User 1" className = "comment-view__photo"/>*/}
                   <div className = "comment-view__user-box">
                       <p className = "comment-view__user-name">{comment.name}</p>
                       <p className = "comment-view__user-comment">{comment.comment}</p>                       
                    </div>
                    {user&&user._id === comment.user._id?renderActionBtn(comment):null}                       
      </div>
    )
}

export default CommentItem;