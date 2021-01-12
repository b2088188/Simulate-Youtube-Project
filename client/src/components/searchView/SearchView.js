import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
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
   const { videos, statusVideos, errorVideos } = useSearchState();
   const { getSearchVideos } = useSearchActions();
   const [page, setPage] = useState(1);
   const { search } = useLocation();
   const searchParams = new URLSearchParams(search);
   const q = searchParams.get('q');
   useEffect(() => {
      getSearchVideos(q);
      setPage(1);
   }, [q, getSearchVideos]);

   function fetchNext(q, page) {
      return function () {
         console.log(page);
         getSearchVideos(q, page + 1);
         setPage((prev) => prev + 1);
      };
   }

   function calcPage(list, page, resPerPage = 5) {
      const end = page * resPerPage;
      return list.slice(end);
   }

   function renderList(list) {
      return list?.map(function generateItem(result) {
         return <SearchItem key={result._id} result={result} />;
      });
   }
   const renderSearchList = R.pipe(calcPage, renderList);

   if (statusVideos === 'idle' || statusVideos === 'pending') return <Spinner modifiers='dark' />;
   if (statusVideos === 'resolved' && videos.length < 1)
      return <Message text='No video found, please try another search.' />;
   if (statusVideos === 'resolved')
      return (
         <div className={className}>
            <nav className='navigation'>
               <List>
                  {
                     <InfiniteScroll
                        pageStart={page}
                        loadMore={fetchNext(q, page)}
                        hasMore={videos.length >= 5}
                        initialLoad={false}
                     >
                        {renderList(videos)}
                     </InfiniteScroll>
                  }
                  {/*renderSearchList(videos, page)*/}
               </List>
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
