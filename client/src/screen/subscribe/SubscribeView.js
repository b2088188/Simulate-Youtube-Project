import React from 'react';
import styled from 'styled-components/macro';
import { useSubscribeItems } from 'utils/subscription';
import { Title, List } from 'design/components';
import { colorGrey, media } from 'design/utils';
import useAuth from 'context/auth/authContext';
import SubscribeItem from './SubscribeItem';
import { AreaSpinner } from 'components/Spinner';

const SubscribeView = ({ className }) => {
   const [{ user }] = useAuth();
   const { subscribeItems, isIdle, isLoading, isSuccess } = useSubscribeItems(user._id);

   function renderSubscriptions(list) {
      return list.map(function generateItem(subscribe) {
         return <SubscribeItem key={subscribe._id} subscribe={subscribe} />;
      });
   }

   if (isIdle || isLoading) return <AreaSpinner />;
   if (isSuccess)
      return (
         <div className={className}>
            <Title
               as='h2'
               css={`
                  color: ${colorGrey.light1};
               `}
            >
               Subscriptions
            </Title>
            <nav>
               <List
                  css={`
                     ${media.tabport(`
                      display: flex;
                     `)}
                  `}
               >
                  {renderSubscriptions(subscribeItems)}
               </List>
            </nav>
         </div>
      );
};

export default styled(SubscribeView)`
   border-top: solid 0.1rem #fff;
   padding: 2rem 1rem;
   margin-bottom: auto;
   ${media.tabport(`
   padding: 1rem;
      `)}
`;
