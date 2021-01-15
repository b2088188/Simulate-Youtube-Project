import React from "react";
import styled from "styled-components";
import { ListGroup, ImageContainer, Image, Link, Title } from "../../design/components";
import { colorGrey, setFlex, media } from "../../design/utils";
import { Link as ReactLink } from "react-router-dom";
import { formatShortTitle } from "../../utils/Format";

const HomeItem = ({ video, className, isLast, lastHomeElementRef }) => {  
  return (
    <ListGroup.Item flexWidth = {{desktop: '20', tabland: '30', tabport: '45', phone: '90'}} spacing = {{desktop: '2.5', tabland: '1.5', tabport: '2.5', phone: '5'}} ref = {isLast ? lastHomeElementRef : null } className={className}>
      <Link as={ReactLink} className="link" to={`/watch/${video.videoId}`}>
        <ImageContainer width = '100%'>
          <Image src={video.images} alt={video.title} />
        </ImageContainer>
        <div className="infobox">
          <ImageContainer width = '3.5rem' mr = '1rem'>
            <Image modifiers="round" src={video.channel?.image} />
           </ImageContainer>
          <div className="titlebox">
            <Title modifiers="small">{formatShortTitle(video.title)}</Title>
            <Title modifiers={["mini", "exlight"]} className="channeltitle">
              {video.channel?.title}
            </Title>
          </div>
        </div>
      </Link>
    </ListGroup.Item>
  );
};

export default styled(HomeItem)`
  margin-bottom: 1%;
  ${media.phone(`
    margin-bottom: 2.5%;
    `)}
  .infobox {
    ${setFlex({ y: "center" })}
    margin-top: 1rem;
    height: 30%;
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
