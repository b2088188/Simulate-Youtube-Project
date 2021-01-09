import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ImageContainer,
  Link as SLink,
  Video,
  Title,
  Paragraph,
  ListGroup,
  Button,
  Icon,
  Image,
} from "../../design/components";
import { setFlex, colorGrey } from "../../design/utils";
import { useAuthState } from "../../stores/auth/authStateContext";
import { useVideoState } from "../../stores/video/videoStateContext";
import { useVideoActions } from "../../stores/video/videoActionContext";
import { useLikeState } from "../../stores/likes/likeStateContext";
import { useLikeActions } from "../../stores/likes/likeActionContext";
import { useSubscribeState } from "../../stores/subscriptions/subscribeStateContext";
import { useSubscribeActions } from "../../stores/subscriptions/subscribeActionContext";
import CommentView from "../commentView/CommentView";
import { Embed } from "semantic-ui-react";
import { ThumbUp } from "@material-ui/icons";
import { Accordion } from "semantic-ui-react";
import { formatDate } from "../../utils/Format";
import axios from "axios";

//  let likeItem = {
//         videoId: video.id,
//         channelId: video.snippet.channelId,
//         title: video.snippet.title,
//         channelTitle: video.snippet.channelTitle,
//         image: video.snippet.thumbnails.high.url,
//         publishDate: video.snippet.publishedAt
//  }
//     const {data}  = await axios.post('/api/v1/likes', likeItem, config.current);
//     dispatch({
//      type: CREATE_LIKE,
//      payload: {
//          like: data.data.like
//      }
//     })

const VideoView = ({ history, className }) => {
  const { user } = useAuthState();
  const { videoId } = useParams();
  const { video, statusVideo, errorVideo } = useVideoState();
  const { fetchVideo } = useVideoActions();
  const { likes, like, statusLikes, statusLike } = useLikeState();
  const { fetchLikes, fetchLike } = useLikeActions();
  const { fetchSubs } = useSubscribeActions();
  //const { currentLikeStatus, checkLikeStatus, createLikeItem, deleteLikeItem, setLikeStatus } = useContext(LikeContext);
  //const { currentSubscribeStatus, checkSubscribeStatus, onSubscribeHandle } = useContext(SubscribeContext);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [statusCurrentLike, setStatusCurrentLike] = useState(null);
  useEffect(() => {
    fetchVideo(axios.get(`/api/v1/videos/${videoId}`));
  }, [videoId, fetchVideo, fetchLikes]);

  useEffect(() => {
    if (user)
      fetchLike(axios.get(`/api/v1/users/${user._id}/likes/${videoId}`));
  }, [user, videoId]);

  useEffect(() => {
    if (statusLike === "resolved") setStatusCurrentLike(like ? true : false);
  }, [statusLike]);

  // useEffect(() => {

  // }, [video.channel._id])

  // useEffect(() => {
  //     if (channel)
  //         checkSubscribeStatus(channel.id);
  // }, [channel])

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  function onLikeHandle(video) {
    return function () {
      if (!statusCurrentLike) {
        fetchLikes(
          axios.post(`/api/v1/users/${user._id}/likes`, {
            videoId: video.videoId,
            title: video.title,
            channelId: video.channel.channelId,
            channelTitle: video.channel.title,
            image: video.images,
            publishedAt: video.publishedAt,
          })
        );
        setStatusCurrentLike(true);
      } else {
        fetchLikes(
          axios.delete(`/api/v1/users/${user._id}/likes/${video.videoId}`)
        );
        setStatusCurrentLike(null);
      }
    };
  }

  function onSubscribeClick(channel) {
    return function () {
      //fetchSubscriptions(axios.post('/api/v1/subscriptions', channel));
    };
  }

  if (statusVideo === "idle" || statusVideo === "pending")
    return (
      <Icon
        loading
        name="spinner"
        size="huge"
        className="search-view__spinner"
      />
    );

  if (!video) return null;
  if (statusVideo === "resolved")
    return (
      <div className={className}>
        <div className="video__videobox">
          <Video src={videoSrc} title="video player" />
        </div>
        <ListGroup ycenter className="video__titlebox">
          <ListGroup.Item p70>
            <Title modifiers="medium">{video.title}</Title>
            <Paragraph modifiers="small">
              {formatDate(video.publishedAt)}
            </Paragraph>
          </ListGroup.Item>
          <ListGroup.Item p30 className="video__shareinfo">
            <Button
              modifiers="transparent"
              className="video__likebtn"
              onClick={
                user ? onLikeHandle(video) : () => history.push("/login")
              }
            >
              <Icon as={ThumbUp} />
            </Button>
            <Button
              modifiers="primary"
              className="video__subscribebtn"
              onClick={
                user
                  ? onSubscribeClick(video.channel)
                  : () => history.push("/login")
              }
            >
              Subscribe
            </Button>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup modifiers="vertical" className="video__info">
          <ListGroup.Item className="video__channelbox">
            <SLink
              as={Link}
              className="video__channellink"
              to={`/channel/${video.channel.channelId}`}
            >
              <ImageContainer>
                <Image
                  modifiers="round"
                  src={video.channel.image}
                  alt="Author image"
                />
              </ImageContainer>
            </SLink>
            <Title as="h2" modifiers="bold">
              {video.channel.title}
            </Title>
          </ListGroup.Item>
          <ListGroup.Item>
            {descriptionShow ? (
              <Paragraph modifiers="small">{video.description}</Paragraph>
            ) : null}
            <Button
              modifiers={["medium", "transparent"]}
              onClick={() => setDescriptionShow(!descriptionShow)}
            >
              {descriptionShow ? "Show Less" : "Show More"}
            </Button>
          </ListGroup.Item>
        </ListGroup>
        <CommentView />
      </div>
    );
};

export default styled(VideoView)`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0rem;
  .video {
    &__videobox {
      box-shadow: var(--shadow-dark-shallow);
      height: 70rem;
      @media only screen and (max-width: 56.25em) {
        height: 50rem;
      }

      @media only screen and (max-width: 37.5em) {
        height: 35rem;
      }
    }

    &__titlebox {
      border-bottom: solid 0.1rem #000;
      padding: 2rem 1rem;
      @media only screen and (max-width: 56.25em) {
        flex: 0 0 90%;
        padding: 1rem 0;
      }
    }

    &__shareinfo {
      ${setFlex()}
    }

    &__likebtn {
      flex: 0 0 5%;
    }

    &__subscribebtn {
      flex: 0 0 15%;
    }

    &__info {
      padding: 2rem 0;
      border-bottom: solid 0.1rem #000;
      @media only screen and (max-width: 56.25em) {
        flex: 0 0 90%;
        padding: 1rem 0;
      }
    }

    &__channelbox {
      ${setFlex({ y: "center" })}
      margin-bottom: .5rem;
    }
    &__channellink {
      flex: 0 0 5%;
      margin-right: 1rem;
    }
  }
`;
