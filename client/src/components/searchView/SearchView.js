import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Col, List, Navigation, FlexWrapper } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useSearchState } from '../../stores/search/searchStateContext';
import { useSearchActions } from '../../stores/search/searchActionContext';
import SearchItem from './SearchItem';
import { Spinner, Message } from '../../design/elements';
import { NativeSelect, FormHelperText } from '@material-ui/core';

const SearchView = ({ className }) => {
   const { videos, hasMore, statusVideos, errorVideos } = useSearchState();
   const { getSearchVideos, searchReset } = useSearchActions();
   const { search } = useLocation();
   const observer = useRef();
   const lastSearchElementRef = useCallback(
      (node) => {
         if (statusVideos === 'pending') return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver(
            (entries) => {
               if (entries[0].isIntersecting && hasMore) {
                  setPage((prev) => prev + 1);
               }
            },
            { threshold: 0.5 }
         );
         if (node) observer.current.observe(node);
      },
      [statusVideos, hasMore]
   );
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');
   const [sortBy, setSortBy] = useState('');
   const [page, setPage] = useState(1);

   useEffect(() => {
      setPage(1);
      searchReset();
   }, [q, searchReset]);

   useEffect(() => {
      getSearchVideos(q, page, sortBy);
   }, [q, page, sortBy, getSearchVideos]);

   function onSortClick(e) {
      setPage(1);
      searchReset();
      setSortBy(e.target.value);
   }

   function renderSearchList(list) {
      return list?.map(function generateItem(result, i, arr) {
         return (
            <SearchItem
               key={result._id}
               result={result}
               lastSearchElementRef={lastSearchElementRef}
               isLast={i + 1 === arr.length}
            />
         );
      });
   }

   if (statusVideos === 'resolved' && videos.length < 1)
      return (
         <Col width='10'>
            <Message text='No video found, please try another search.' />
         </Col>
      );
   if (statusVideos === 'rejected' && errorVideos)
      return (
         <Col width='10'>
            <Message severity='error' text={errorVideos} />
         </Col>
      );
   return (
      <Col width='10' className={className}>
         <Navigation flexwidth={{ desktop: '60', tabland: '70', tabport: '90' }}>
            <NativeSelect
               value={sortBy}
               onChange={onSortClick}
               name='category'
               inputProps={{ 'aria-label': 'age' }}
            >
               <option value=''>Relevance</option>
               <option value='-createdAt'>Upload Date</option>
               <option value='-views'>View Count</option>
            </NativeSelect>
            <FormHelperText>Sort By</FormHelperText>

            <List>{renderSearchList(videos)}</List>
            <FlexWrapper>
               {statusVideos === 'idle' || statusVideos === 'pending' ? (
                  <Spinner modifiers='dark' />
               ) : null}
            </FlexWrapper>
         </Navigation>
      </Col>
   );
};

export default styled(SearchView)`
   ${setFlex({ x: 'center', wrap: 'wrap' })}
   padding: 5rem 0rem;
`;
