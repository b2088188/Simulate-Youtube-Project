import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCommentSearch, useCreateComment, useUpdateComment } from 'utils/comment';
import { Form, Button, FlexWrapper, Input } from 'design/components';
import useAuth from 'context/auth/authContext';
import { useAsync } from 'utils/hooks';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import { Spinner } from 'components/Spinner';
import { Message } from 'components/Message';

const CommentView = ({ className }) => {
   const [{ user }] = useAuth();
   let { videoId } = useParams();
   const { register, handleSubmit, setValue, reset } = useForm();
   const [currentTypedComment, setCurrentTypedComment] = useState(null);
   const { comments, isIdle, isLoading, isSuccess, isError, error } = useCommentSearch(videoId);
   const {
      isLoading: isMutateLoading,
      // isError: isMutateError,
      // error: errorMutate,
      run
   } = useAsync();
   const { create } = useCreateComment(videoId);
   const { update } = useUpdateComment(videoId);
   useEffect(() => {
      if (currentTypedComment) setValue('comment', currentTypedComment.comment);
   }, [currentTypedComment, setValue]);

   function onCancelClick() {
      reset();
      setCurrentTypedComment(null);
   }

   function handleClick(values) {
      if (!currentTypedComment) {
         run(create(values));
      } else {
         run(update({ commentId: currentTypedComment._id, comment: values }));
      }
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

   if (isIdle || isLoading || isMutateLoading)
      return (
         <FlexWrapper>
            <Spinner modifiers='dark' />
         </FlexWrapper>
      );
   if (isError && error) return <Message severity='error' text={error} />;
   if (isSuccess)
      return (
         <div className={className}>
            {user ? (
               <Form className='comment__form' onSubmit={handleSubmit(handleClick)}>
                  <Input
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
