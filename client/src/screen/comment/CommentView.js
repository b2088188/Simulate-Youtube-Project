import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useCommentSearch, useCreateComment, useUpdateComment } from 'utils/comment';
import { Form, Button, Input, Title, Icon } from 'design/components';
import { Menu, MenuItem, MenuOpenButton, MenuContent } from 'components/Menu';
import useAuth from 'context/auth/authContext';
import { useAsync } from 'utils/hooks';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import { AreaSpinner } from 'components/Spinner';
import { setFlex } from 'design/utils';
import { Sort } from '@material-ui/icons';

const CommentView = ({ className }) => {
   const [{ user }] = useAuth();
   let { videoId } = useParams();
   const [sortBy, setSortBy] = useState('');
   const { register, handleSubmit, setValue, reset } = useForm();
   const [currentTypedComment, setCurrentTypedComment] = useState(null);
   const { comments, isIdle, isLoading, isSuccess } = useCommentSearch(videoId, sortBy);
   const {
      isLoading: isMutateLoading,
      // isError: isMutateError,
      // error: errorMutate,
      run
   } = useAsync();
   const { create } = useCreateComment(videoId, sortBy);
   const { update } = useUpdateComment(videoId, sortBy);

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
               sortBy={sortBy}
            />
         );
      });
   }

   if (isIdle || isLoading) return <AreaSpinner />;
   if (isSuccess)
      return (
         <div
            css={`
               margin-top: 5rem;
            `}
         >
            <div
               css={`
                  ${setFlex({ y: 'center' })}
               `}
            >
               <Title
                  css={`
                     margin-right: 0.5rem;
                  `}
               >
                  {comments.length} Comments
               </Title>
               <Menu>
                  <MenuOpenButton>
                     <Button
                        modifiers='transparent'
                        css={`
                           ${setFlex({ y: 'center' })}
                        `}
                     >
                        <Icon as={Sort} />
                        Sort By
                     </Button>
                  </MenuOpenButton>
                  <MenuContent>
                     <MenuItem onClick={() => setSortBy('-likes')}>Top comments</MenuItem>
                     <MenuItem onClick={() => setSortBy('-createdAt')}>Newest first</MenuItem>
                  </MenuContent>
               </Menu>
            </div>
            {user ? (
               <Form
                  css={`
                     margin: 3rem 0;
                  `}
                  onSubmit={handleSubmit(handleClick)}
               >
                  <Input
                     modifiers='transparent'
                     type='text'
                     name='comment'
                     placeholder='Add a public comment...'
                     ref={register({
                        required: 'Please type your comment'
                     })}
                  />
                  <div
                     css={`
                        margin-top: 1rem;
                        ${setFlex({ x: 'flex-end' })}
                     `}
                  >
                     <Button onClick={onCancelClick}>Cancel</Button>
                     <Button modifiers='secondary'>Comment</Button>
                  </div>
               </Form>
            ) : null}
            <div>{isMutateLoading ? <AreaSpinner /> : renderComments(comments)}</div>
         </div>
      );
};

export default CommentView;
