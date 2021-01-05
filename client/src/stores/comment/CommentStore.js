import React, {useReducer, useMemo} from 'react';
import {CommentStateProvider} from './commentStateContext';
import {CommentActionProvider} from './commentActionContext';
import commentReducer from './commentReducer';
import {
   GET_COMMENTS,
   ADD_COMMENT,
   UPDATE_COMMENT,
   DELETE_COMMENT,
   SET_CURRENT,
   CLEAR_CURRENT
} from '../types';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';




const CommentStore = ({
	children
}) => {
   const [stateComments, fetchComments] = useAsync({       
      data: []  
    })
   const [stateComment, fetchComment] = useAsync({       
      data: {}  
    })
   


  const value = useMemo(() => ({
      comments: stateComments.data.comments,
      statusComments: stateComments.status,
      errorComments: stateComments.error,
      statusComment: stateComment.status
  }), [stateComments, stateComment])

  const actions = useMemo(() => ({
      fetchComments,
      fetchComment
  }), [fetchComments, fetchComment])

	return (
    <CommentStateProvider value = {value}>
       <CommentActionProvider value = {actions}>
          {children}
       </CommentActionProvider>
    </CommentStateProvider>
		)
}

export default CommentStore;