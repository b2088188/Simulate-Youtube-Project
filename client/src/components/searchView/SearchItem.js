import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
   Link as SLink,
   Paragraph,
   Title,
   List,
   Image,
   ImageContainer,
   ListGroup
} from '../../design/components';
import { formatDate } from '../../utils/Format';

const SearchItem = ({ result, className, isLast, lastSearchElementRef }) => {
   return (
      <List.Item className={className} ref={isLast ? lastSearchElementRef : null}>
         <SLink as={Link} to={`/watch/${result.videoId}`} className='search__link'>
            <ImageContainer flexWidth='35'>
               <Image src={result.images} alt={result.title} />
            </ImageContainer>
            <div className='search__descriptionbox'>
               <Title as='h2'>{result.title}</Title>
               <Paragraph modifiers='tini'>{formatDate(result.publishedAt)}</Paragraph>
               <ListGroup flexY='center' pd={{ x: '0', y: '0' }}>
                  <ImageContainer size={{ width: '3rem', height: '3rem' }}>
                     <Image src={result.channel?.image} modifiers='round' />
                  </ImageContainer>
                  <Title as='h3' modifiers={['small', 'light']}>
                     {result.channel?.title || ''}
                  </Title>
               </ListGroup>
               <Paragraph modifiers='tini' className='search__descripton'>
                  {result.description}
               </Paragraph>
            </div>
         </SLink>
      </List.Item>
   );
};

export default styled(SearchItem)`
   &:not(:last-child) {
      margin-bottom: 2rem;
   }
   .search {
      &__link {
         text-decoration: none;
         color: var(--color-grey-dark);
         width: 100%;
         height: 100%;
         background-color: #fff;
         box-shadow: var(--shadow-light);
         display: flex;

         &:hover {
            color: currentColor;
         }
      }

      &__descriptionbox {
         flex: 1;
         padding: 2rem 2rem;

         @media only screen and (max-width: 75em) {
            font-size: 50%;
            padding: 1rem 1rem;
         }
      }

      &__description {
         @media only screen and (max-width: 75em) {
            line-height: 1.5;
         }
         @media only screen and (max-width: 37.5em) {
            display: none;
         }
      }
   }
`;
