import React from "react";
import styled from "styled-components";
import { Col, Image, Link, Title } from "../../design/components";
import { colorGrey, setFlex } from "../../design/utils";
import { Link as ReactLink } from "react-router-dom";
import { formatShortTitle } from "../../utils/Format";

const HomeItem = ({ video, className }) => {
  return (
    <Col col_3 mg={{ x: "2.5%", y: "1%" }} className={className}>
      <Link as={ReactLink} className="link" to={`/watch/${video.videoId}`}>
        <div className="video__imgbox">
          <Image src={video.videoImage} alt={video.title} />
        </div>
        <div className="infobox">
          <div className="channel__imgbox">
            <Image modifiers="round" src={video.channelImage} />
          </div>
          <div className="titlebox">
            <Title modifiers="small">{formatShortTitle(video.title)}</Title>
            <Title modifiers={["mini", "exlight"]} className="channeltitle">
              {video.channelTitle}
            </Title>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default styled(HomeItem)`
  @media only screen and (max-width: 75em) {
    flex: 0 0 31%;
    margin-right: 1.5%;
  }
  @media only screen and (max-width: 37.5em) {
    flex: 0 0 48%;
  }
  @media only screen and (max-width: 31.25em) {
    flex: 0 0 98%;
    margin-right: 1%;
  }

  .video__imgbox {
    width: 100%;
    height: 70%;
  }

  .infobox {
    ${setFlex({ y: "flex-start" })}
    margin-top: 1rem;
    height: 30%;
  }
  .channel__imgbox {
    width: 15%;
    margin: 0 1rem;
  }

  .titlebox {
    width: 85%;
    ${setFlex({ direction: "column", x: "center", y: "flex-start" })}
  }

  .channeltitle {
    margin-top: 0.5rem;
    color: ${colorGrey.dark2};
  }
`;
