import React from 'react';
import { Col, CenterWrapper, List } from 'design/components';
import { Spinner } from 'components/Spinner';
import { useLikeItems } from 'utils/like';
import LikedItem from './LikedItem';

const LikedView = ({ className }) => {
   const { likeItems, isIdle, isLoading, isSuccess } = useLikeItems();

   function renderLikeList(list) {
      return list?.map(function generateItem(like) {
         return <LikedItem like={like} key={like._id} />;
      });
   }

   if (isIdle || isLoading) return <Spinner modifiers='dark' />;
   if (isSuccess)
      return (
         <Col width='10' className={className}>
            <CenterWrapper width={{ desktop: '60', tabland: '70', tabport: '90' }} my='2'>
               <nav>
                  <List>{renderLikeList(likeItems)}</List>
               </nav>
            </CenterWrapper>
         </Col>
      );
};

export default LikedView;
