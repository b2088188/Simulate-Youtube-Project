import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Button } from '../../design/components';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useCommentState } from '../../stores/comment/commentStateContext';
import { useCommentActions } from '../../stores/comment/commentActionContext';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import { Spinner, Message } from '../../design/elements';

const CommentView = ({ className }) => {
   const { user } = useAuthState();
   const { comments, statusComments, errorComments } = useCommentState();
   const { register, handleSubmit, setValue, reset } = useForm();
   const { getVideoComments, createComment, updateComment } = useCommentActions();
   const [currentTypedComment, setCurrentTypedComment] = useState(null);
   let { videoId } = useParams();

   useEffect(() => {
      getVideoComments(videoId);
   }, [getVideoComments, videoId]);

   useEffect(() => {
      if (currentTypedComment) setValue('comment', currentTypedComment.comment);
   }, [currentTypedComment, setValue]);

   function onCancelClick() {
      reset();
      setCurrentTypedComment(null);
   }

   async function onCreate(values) {
      createComment(videoId, values);
      setCurrentTypedComment(null);
   }

   function onUpdate(values) {
      updateComment(videoId, currentTypedComment._id, values);
      setCurrentTypedComment(null);
   }

   function renderComments(list) {
      return list?.map(function generateItem(comment) {
         return (
            <CommentItem
               key={comment._id}
               comment={comment}
               setCurrentTypedComment={setCurrentTypedComment}
            />
         );
      });
   }

   if (statusComments === 'idle' || statusComments === 'pending')
      return <Spinner modifiers='dark' />;
   if (statusComments === 'rejected' && errorComments)
      return <Message severity='error' text={errorComments} />;
   if (statusComments === 'resolved')
      return (
         <div className={className}>
            {user ? (
               <Form
                  className='comment__form'
                  onSubmit={handleSubmit(!currentTypedComment ? onCreate : onUpdate)}
               >
                  <Form.Input
                     modifiers='transparent'
                     type='text'
                     name='comment'
                     placeholder='Add a public comment...'
                     ref={register({
                        required: 'Please type your comment'
                     })}
                  />
                  <div className='comment__submitbox'>
                     <Button onClick={onCancelClick}>Cancel</Button>
                     <Button modifiers='secondary'>Comment</Button>
                  </div>
               </Form>
            ) : null}
            <div>{renderComments(comments)}</div>
         </div>
      );
};

export default styled(CommentView)`
   margin-top: 5rem;

   .comment {
      &__form {
         margin: 3rem 0;
      }

      &__submitbox {
         margin-top: 1rem;
         display: flex;
         justify-content: flex-end;
      }
   }
`;
