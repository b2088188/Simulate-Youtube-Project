import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListGroup, Link as SLink, ImageContainer, Image, Title } from 'design/components';
import { media } from 'design/utils';
import { formatShortTitle, formatDate } from 'utils/format';
const ChannelItem = ({ video, className }) => {
   return (
      <ListGroup.Item
         width={{ desktop: '15', tabland: '20', tabport: '30', phone: '90' }}
         spacing={{ desktop: '2.5', tabport: '1.5', phone: '5' }}
         className={className}
      >
         <SLink as={Link} to={`/watch/${video.videoId}`}>
            <ImageContainer>
               <Image src={video.images} alt={video.title} />
            </ImageContainer>
            <div>
               <Title as='h2' modifiers='small'>
                  {formatShortTitle(video.title)}
               </Title>
               <Title as='h3' modifiers={['small', 'exlight']}>
                  {formatDate(video.publishedAt)}
               </Title>
            </div>
         </SLink>
      </ListGroup.Item>
   );
};

export default styled(ChannelItem)`
   min-height: 25rem;
   ${media.phone(`
   margin-bottom: 2.5rem;
      `)}
`;
