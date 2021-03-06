import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorGrey, colorPrimary, media } from 'design/utils';
import { List, Link as SLink, ImageContainer, Image, Title } from 'design/components';

const SubscribeItem = ({ subscribe, className }) => {
   return (
      <List.Item pd={[{ x: '1rem', y: '1rem' }]} className={className}>
         <SLink as={Link} to={`/channel/${subscribe.channel._id}`} flexy='center'>
            <ImageContainer width='3.5rem' mr='5%'>
               <Image
                  modifiers='round'
                  src={subscribe.channel.image}
                  alt={subscribe.channel.title}
               />
            </ImageContainer>
            <Title as='h2' modifiers={['small', 'exlight']} className='title'>
               {subscribe.channel.title}
            </Title>
         </SLink>
      </List.Item>
   );
};

export default styled(SubscribeItem)`
   transition: background 0.25s;
   &:hover {
      background: ${colorPrimary.default};
   }
   &:active {
      background: ${colorPrimary.light};
   }
   .title {
      color: ${colorGrey.light1};
      ${media.tabport(`
            display: none;
            `)}
   }
`;
