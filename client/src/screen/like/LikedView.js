import React from 'react';
import styled from 'styled-components/macro';
import { Col, CenterWrapper, List } from 'design/components';
import { AreaSpinner } from 'components/Spinner';
import { useLikeItems } from 'utils/like';
import LikedItem from './LikedItem';

const LikedView = ({ className }) => {
   const { likeItems, isIdle, isLoading, isSuccess } = useLikeItems();

   function renderLikeList(list) {
      return list?.map(function generateItem(like) {
         return <LikedItem like={like} key={like._id} />;
      });
   }

   if (isIdle || isLoading)
      return (
         <Col width='10'>
            <AreaSpinner />
         </Col>
      );
   if (isSuccess)
      return (
         <Col width='10'>
            <CenterWrapper
               width={{ desktop: '60', tabland: '70', tabport: '90' }}
               css={`
                  margin: 2rem auto;
               `}
            >
               <nav>
                  <List>{renderLikeList(likeItems)}</List>
               </nav>
            </CenterWrapper>
         </Col>
      );
};

export default LikedView;
