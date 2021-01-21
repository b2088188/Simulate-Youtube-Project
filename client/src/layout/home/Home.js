import React, { useEffect, useRef, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Col, ListGroup } from '../../design/components';
import { useHomeState } from '../../stores/home/homeStateContext';
import { useHomeActions } from '../../stores/home/homeActionContext';
import HomeItem from './HomeItem';
import { Spinner } from '../../design/elements';

const Home = ({ className }) => {
   const { videos, statusVideos, page, hasMore } = useHomeState();
   const { getHomeVideos, pageChange, homeReset } = useHomeActions();
   const { url } = useRouteMatch();
   const observer = useRef();
   const lastHomeElementRef = useCallback(
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
   useEffect(() => {
      getHomeVideos(page);
   }, [getHomeVideos, page]);

   useEffect(() => {
      homeReset();
   }, [homeReset, url]);

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
         <ListGroup flexy='center' wrap='true'>
            {renderResults(videos)}
            {statusVideos === 'idle' || statusVideos === 'pending' ? (
               <Spinner modifiers='dark' />
            ) : null}
         </ListGroup>
      </Col>
   );
};

export default styled(Home)`
   padding: 2rem;
`;
