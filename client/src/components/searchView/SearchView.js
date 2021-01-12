import * as R from 'ramda';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { List } from '../../design/components';
import { setFlex } from '../../design/utils';
import { useSearchState } from '../../stores/search/searchStateContext';
import { useSearchActions } from '../../stores/search/searchActionContext';
import SearchItem from './SearchItem';
import Pagination from './Pagination';
import { Spinner, Message } from '../../design/elements';
import InfiniteScroll from 'react-infinite-scroller';

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
      [statusVideos, hasMore]
   );
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');

   useEffect(() => {
      searchReset();
   }, [q]);

   useEffect(() => {
      getSearchVideos(q, page);
   }, [q, page, getSearchVideos]);

   function calcPage(list, page, resPerPage = 5) {
      const end = page * resPerPage;
      return list.slice(end);
   }

   function renderList(list) {
      return list?.map(function generateItem(result, i, arr) {
         return (
            <SearchItem
               key={result._id}
               result={result}
               lastSearchElementRef={lastSearchElementRef}
               isLast={i + 1 === arr.length}
            />
         );
         return <SearchItem key={result._id} result={result} />;
      });
   }
   const renderSearchList = R.pipe(calcPage, renderList);

   if (statusVideos === 'resolved' && videos.length < 1)
      return <Message text='No video found, please try another search.' />;
   return (
      <div className={className}>
         <nav className='navigation'>
            <List>{renderList(videos)}</List>
            {statusVideos === 'idle' || statusVideos === 'pending' ? (
               <Spinner modifiers='dark' />
            ) : null}
         </nav>
         {/*videos.length > 1 ? (
               <Pagination
                  pages={Math.ceil(videos.length / 5)}
                  page={page}
                  changePage={setPage}
               />
            ) : null*/}
      </div>
   );
};

export default styled(SearchView)`
   ${setFlex({ x: 'center', wrap: 'wrap' })}
   padding: 5rem 0rem;

   .navigation {
      flex: 0 0 60%;

      @media only screen and (max-width: 56.25em) {
         flex: 0 0 90%;
      }
   }
`;
