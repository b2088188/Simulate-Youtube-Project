import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Col, ListGroup } from '../../design/components';
import { useHomeState } from '../../stores/home/homeStateContext';
import { useHomeActions } from '../../stores/home/homeActionContext';
import HomeItem from './HomeItem';
import { Spinner, ScrollerTab } from '../../design/elements';
import { Tab } from '@material-ui/core';

const Home = ({ className }) => {
   const { videos, statusVideos, hasMore } = useHomeState();
   const { getHomeVideos, homeReset } = useHomeActions();
   const [query, setQuery] = useState('');
   const [page, setPage] = useState(1);
   const observer = useRef();
   const lastHomeElementRef = useCallback(
      (node) => {
         if (statusVideos === 'pending') return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               setPage((prev) => prev + 1);
            }
         });
         if (node) observer.current.observe(node);
      },
      [statusVideos, hasMore]
   );

   useEffect(() => {
      homeReset();
   }, [homeReset, query]);

   useEffect(() => {
      getHomeVideos(page, query);
   }, [getHomeVideos, page, query]);

   function queryChange(queryString) {
      return function () {
         setPage(1);
         setQuery(queryString);
      };
   }

   function renderResults(list) {
      return list.map(function generateItem(video, i, arr) {
         return (
            <HomeItem
               key={video._id}
               video={video}
               isLast={i + 1 === arr.length}
               lastHomeElementRef={lastHomeElementRef}
            />
         );
      });
   }
   return (
      <Col width='10' className={className}>
         <ScrollerTab>
            {['All', 'ASMR', 'React', 'JavaScript', 'Node', 'CSS', 'Bootstrap'].map(
               function renderTabs(queryString) {
                  return (
                     <Tab
                        label={queryString}
                        key={queryString}
                        onClick={queryChange(queryString === 'All' ? '' : queryString)}
                     />
                  );
               }
            )}
         </ScrollerTab>
         <ListGroup flexy='center' wrap='true'>
            {renderResults(videos)}
         </ListGroup>
         <ListGroup flexy='center'>
            {statusVideos === 'idle' || statusVideos === 'pending' ? (
               <Spinner modifiers='dark' />
            ) : null}
         </ListGroup>
      </Col>
   );
};

export default styled(Home)`
   padding: 0;
`;
