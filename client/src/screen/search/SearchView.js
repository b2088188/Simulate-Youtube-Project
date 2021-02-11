import React, { useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useVideoSearch } from 'utils/video';
import styled from 'styled-components';
import { Col, List, Navigation, FlexWrapper } from 'design/components';
import { setFlex } from 'design/utils';
import SearchItem from './SearchItem';
import { Message } from 'components/Message';
import { Spinner } from 'components/Spinner';
import { Select } from 'components/Select';

const SearchView = ({ className }) => {
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const observer = useRef();
   const q = searchParams.get('q');
   const [sortBy, setSortBy] = useState('');
   const {
      videos,
      hasNextPage,
      fetchNextPage,
      isSuccess,
      isFetching,
      isFetchingNextPage,
      isError,
      error
   } = useVideoSearch(q, sortBy);
   const lastSearchElementRef = useCallback(
      (node) => {
         if (!hasNextPage || isFetchingNextPage) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver(
            (entries) => {
               if (entries[0].isIntersecting && hasNextPage) {
                  fetchNextPage();
               }
            },
            { threshold: 0.5 }
         );
         if (node) observer.current.observe(node);
      },
      [isFetchingNextPage, hasNextPage, fetchNextPage]
   );

   function renderSearchList(videos) {
      return videos.map((videoGroup) => {
         return videoGroup.data.map(function generateItem(result, i, arr) {
            return (
               <SearchItem
                  key={result._id}
                  result={result}
                  lastSearchElementRef={lastSearchElementRef}
                  isLast={i + 1 === arr.length}
               />
            );
         });
      });
   }

   if (isSuccess && videos.length < 1)
      return (
         <Col width='10'>
            <Message text='No video found, please try another search.' />
         </Col>
      );
   if (isError && error)
      return (
         <Col width='10'>
            <Message severity='error' text={error.message} />
         </Col>
      );
   return (
      <Col width='10' className={className}>
         <Navigation flexwidth={{ desktop: '60', tabland: '70', tabport: '90' }}>
            <Select value={sortBy} setValue={setSortBy} label='Sort By'>
               <option value=''>Relevance</option>
               <option value='-createdAt'>Upload Date</option>
               <option value='-views'>View Count</option>
            </Select>
            <List>{renderSearchList(videos)}</List>
            <FlexWrapper>
               {isFetching || isFetchingNextPage ? <Spinner modifiers='dark' /> : null}
            </FlexWrapper>
         </Navigation>
      </Col>
   );
};

export default styled(SearchView)`
   ${setFlex({ x: 'center', wrap: 'wrap' })}
   padding: 5rem 0rem;
`;
