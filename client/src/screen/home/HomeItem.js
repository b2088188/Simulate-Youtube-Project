import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ListGroup, ImageContainer, Image, Link as SLink, Title } from 'design/components';
import { colorGrey, setFlex, media } from 'design/utils';
import { formatShortTitle } from 'utils/format';

const HomeItem = ({ video, className, isLast, lastHomeElementRef }) => {
   return (
      <ListGroup.Item
         width={{ desktop: '20', tabland: '30', tabport: '45', phone: '90' }}
         spacing={{ desktop: '2.5', tabland: '1.5', tabport: '2.5', phone: '5' }}
         ref={isLast ? lastHomeElementRef : null}
         className={className}
      >
         <SLink as={Link} to={`/watch/${video.videoId}`}>
            <ImageContainer>
               <Image src={video.images} alt={video.title} />
            </ImageContainer>
            <div
               css={`
                  ${setFlex({ y: 'center' })}
                  margin-top: 1rem;
                  padding: 0.5rem;
               `}
            >
               <ImageContainer width='3.5rem' mr='1rem'>
                  <Image modifiers='round' src={video.channel?.image} />
               </ImageContainer>
               <div
                  css={`
                     width: 85%;
                     ${setFlex({ direction: 'column', x: 'center', y: 'flex-start' })}
                  `}
               >
                  <Title modifiers='small'>{formatShortTitle(video.title)}</Title>
                  <Title
                     modifiers={['mini', 'exlight']}
                     css={`
                        margin-top: 0.5rem;
                        color: ${colorGrey.dark2};
                     `}
                  >
                     {video.channel?.title}
                  </Title>
               </div>
            </div>
         </SLink>
      </ListGroup.Item>
   );
};

export default styled(HomeItem)`
   margin-bottom: 1%;
   transition: box-shadow 0.25s;
   &:hover {
      box-shadow: 0 1rem 2rem rgba(50, 50, 50, 0.3);
      ${media.phone(`
               box-shadow: none;
         `)}
   }
   ${media.phone(`
    margin-bottom: 2.5%;
    `)}
`;
