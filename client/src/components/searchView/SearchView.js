import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Col, List, Navigation } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useSearchState } from '../../stores/search/searchStateContext';
import { useSearchActions } from '../../stores/search/searchActionContext';
import SearchItem from './SearchItem';
import { Spinner, Message } from '../../design/elements';

const SearchView = ({ className }) => {
   const { videos, page, hasMore, statusVideos, errorVideos } = useSearchState();
   const { getSearchVideos, pageChange, searchReset } = useSearchActions();
   const { search } = useLocation();
   const observer = useRef();
   const lastSearchElementRef = useCallback(
      (node) => {
         if (statusVideos === 'pending') return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               pageChange();
            }
         });
         if (node) observer.current.observe(node);
      },
      [statusVideos, hasMore, pageChange]
   );
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');

   useEffect(() => {
      searchReset();
   }, [q, searchReset]);

   useEffect(() => {
      getSearchVideos(q, page);
   }, [q, page, getSearchVideos]);

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
            <List>{renderSearchList(videos)}</List>
            {statusVideos === 'idle' || statusVideos === 'pending' ? (
               <Spinner modifiers='dark' />
            ) : null}
         </Navigation>
      </Col>
   );
};

export default styled(SearchView)`
   ${setFlex({ x: 'center', wrap: 'wrap' })}
   padding: 5rem 0rem;
`;
