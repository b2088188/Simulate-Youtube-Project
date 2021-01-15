import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from '../../design/components';
import { colorNormal } from '../../design/utils';
import { useParams } from 'react-router-dom';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

const Pagination = ({ page, changePage, pages, className }) => {
   let { term } = useParams();

   function renderPageBtn(pages) {
      return [...Array(pages).keys()].map(function generateBtn(pageNum) {
         return (
            <Button
               className='pagination__pagebtn'
               modifiers={['transparent']}
               key={pageNum}
               onClick={() => changePage(pageNum + 1)}
            >
               {pageNum + 1}
            </Button>
         );
      });
   }

   return (
      <div className={className}>
         <Button
            className='pagination__actionbtn'
            modifiers={['transparent']}
            onClick={() => changePage((prev) => prev - 1)}
         >
            <Icon as={ArrowBack} />
         </Button>
         {renderPageBtn(pages)}
         <Button
            className='pagination__actionbtn'
            modifiers={['transparent']}
            onClick={() => changePage((prev) => prev + 1)}
         >
            <Icon as={ArrowForward} />
         </Button>
      </div>
   );
};

export default styled(Pagination)`
   margin-top: 5rem;
   flex: 0 0 60%;
   display: flex;
   justify-content: center;
   .pagination {
      &__pagebtn {
         flex: 0 0 5%;
         &--active {
            color: ${colorNormal.black};
            position: relative;
            &::before {
               content: '';
               bottom: 0;
               left: 50%;
               transform: translateX(-50%);
               position: absolute;
               width: 70%;
               border-bottom: solid 0.2rem var(--color-grey-dark-1);
            }
         }
         &:hover {
            color: ${colorNormal.black};
         }
      }

      &__actionbtn {
         flex: 0 0 5%;
         &:hover {
            color: ${colorNormal.black};
         }
         &--disable {
            visibility: hidden;
         }
      }
   }
`;
