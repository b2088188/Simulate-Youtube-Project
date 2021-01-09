import * as R from "ramda";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "../../design/components";
import { useAuthState } from "../../stores/auth/authStateContext";
import { useCommentState } from "../../stores/comment/commentStateContext";
import { useCommentActions } from "../../stores/comment/commentActionContext";
import { addComment } from "../../stores/comment/CommentStore";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CommentItem from "./CommentItem";
import Spinner from "../../design/elements/Spinner";
import axios from "axios";

const CommentView = ({ className }) => {
  const { user } = useAuthState();
  const {
    comments,
    statusComments,
    statusComment,
    errorComments,
  } = useCommentState();
  const { register, handleSubmit, errors, setValue, reset } = useForm();
  const { fetchComments, fetchComment } = useCommentActions();
  const [currentComment, setCurrentComment] = useState(null);
  const [showActionBtn, setShowActionBtn] = useState(false);
  let { videoId } = useParams();

  useEffect(() => {
    fetchComments(axios.get(`/api/v1/videos/${videoId}/comments`));
  }, [fetchComments, videoId]);

  useEffect(() => {
    if (currentComment) setValue("comment", currentComment.comment);
  }, [currentComment]);

  function onCancelClick() {
    reset();
    setCurrentComment(null);
  }

  async function onCreate(values) {
    fetchComment(axios.post(`/api/v1/videos/${videoId}/comments`, values));
    setCurrentComment(null);
  }

  function onUpdate(values) {
    fetchComment(
      axios.patch(
        `/api/v1/videos/${videoId}/comments/${currentComment._id}`,
        values
      )
    );
    setCurrentComment(null);
  }

  function renderComments(list) {
    return list?.map(function generateItem(comment) {
      return (
        <CommentItem
          key={comment._id}
          comment={comment}
          setCurrentComment={setCurrentComment}
        />
      );
    });
  }

  if (statusComments === "idle" || statusComments === "pending")
    return <Spinner />;

  if (statusComments === "resolved")
    return (
      <div className={className}>
        {user ? (
          <Form
            className="comment__form"
            onSubmit={handleSubmit(!currentComment ? onCreate : onUpdate)}
          >
            <Form.Input
              modifiers="transparent"
              type="text"
              name="comment"
              placeholder="Add a public comment..."
              ref={register({
                required: "Please type your comment",
              })}
            />
            <div className="comment__submitbox">
              <Button onClick={onCancelClick}>Cancel</Button>
              <Button modifiers="secondary">Comment</Button>
            </div>
          </Form>
        ) : null}
        <div className="comment-view__container">
          {renderComments(comments)}
        </div>
      </div>
    );
};

export default styled(CommentView)`
  margin-top: 5rem;

  @media only screen and (max-width: 56.25em) {
    flex: 0 0 90%;
    margin-top: 2rem;
  }

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
