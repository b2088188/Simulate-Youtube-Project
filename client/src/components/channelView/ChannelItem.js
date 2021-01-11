import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
   ListGroup,
   Link as SLink,
   ImageContainer,
   Image,
   Title,
} from '../../design/components';
import { formatShortTitle, formatDate } from '../../utils/Format';

const ChannelItem = ({ video, className }) => {
   return (
      <ListGroup.Item p15 mg={{ x: '2.5%' }} className={className}>
         <SLink as={Link} to={`/watch/${video.videoId}`}>
            <ImageContainer>
               <Image src={video.images} alt={video.title} />
            </ImageContainer>
            <div className='channelinfobox'>
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
`;