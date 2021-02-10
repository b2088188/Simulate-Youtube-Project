import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Col, ListGroup } from 'design/components';
import { useHomeVideoSearch } from 'utils/video';
import HomeItem from './HomeItem';
import { Spinner } from 'components/Spinner';
import { Tabs, Tab } from 'components/Tabs';

const Home = ({ className }) => {
   const [filter, setFilter] = useState('');
   const observer = useRef();
   const {
      videos,
      hasNextPage,
      fetchNextPage,
      isFetching,
      isFetchingNextPage
   } = useHomeVideoSearch(filter);
   const lastHomeElementRef = useCallback(
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

   function renderHomeList(videos) {
      return videos.map((videoGroup) => {
         return videoGroup.data.map(function generateItem(video, i, arr) {
            return (
               <HomeItem
                  key={video._id}
                  video={video}
                  lastHomeElementRef={lastHomeElementRef}
                  isLast={i + 1 === arr.length}
               />
            );
         });
      });
   }

   return (
      <Col width='10' className={className}>
         <Tabs>
            {['All', 'ASMR', 'React', 'JavaScript', 'Node', 'CSS', 'Bootstrap'].map(
               function renderTabs(filterString) {
                  return (
                     <Tab
                        key={filterString}
                        onClick={() =>
                           filterString === 'All' ? setFilter('') : setFilter(filterString)
                        }
                        label={filterString}
                        style={{}}
                     />
                  );
               }
            )}
         </Tabs>
         <ListGroup flexy='center' wrap='true'>
            {renderHomeList(videos)}
         </ListGroup>
         <ListGroup flexy='center'>
            {isFetching || isFetchingNextPage ? <Spinner modifiers='dark' /> : null}
         </ListGroup>
      </Col>
   );
};

export default styled(Home)`
   padding: 0;
`;
