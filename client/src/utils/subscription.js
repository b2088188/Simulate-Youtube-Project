import * as R from 'ramda';
import { userRequest } from '../apis/backend';
import { setQueryDataForVideoSubscribe } from './video';
import { setQueryDataForChannelSubscribe } from './channel';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queryClient } from '../context';
import { useAuthState } from '../stores/auth/authStateContext';

function useDefaultMutationOptions(videoId, channelId) {
   const queryClient = useQueryClient();
   return {
      onSettled: () => {
         queryClient.invalidateQueries('subscribe-items');
         if (videoId) queryClient.invalidateQueries(['videoInfo', { videoId }]);
         if (channelId) queryClient.invalidateQueries(['channelInfo', { channelId }]);
      },
      onError: (err, variables, recover) => {
         if (typeof recover === 'function') {
            // () => queryClient.setQueryData(['subscribe-items', user._id], prevSubscribeItems);
            // () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
            recover();
         }
      }
   };
}

function useSubscribeItems() {
   const { user } = useAuthState();

   const result = useQuery({
      queryKey: ['subscribe-items', user?._id],
      queryFn: () =>
         userRequest
            .get(`/${user?._id}/subscriptions`)
            .then(({ data: { data } }) => data.subscribes)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, subscribeItems: result.data ?? [] };
}

/* eslint-disable */
function useSubscribeItem(channelId) {
   //const { user } = useAuthState();

   const { subscribeItems } = useSubscribeItems();
   return subscribeItems.find((el) => el.channel._id === channelId) ?? null;
}

function useCreateSubscribeItem({ videoId, channelId }) {
   const { user } = useAuthState();
   const queryClient = useQueryClient();
   const defaultOptions = useDefaultMutationOptions(videoId, channelId);

   const mutation = useMutation(
      ({ channel }) => userRequest.post(`/${user?._id}/subscriptions`, { channel }),
      {
         ...defaultOptions,
         onMutate: () => {
            if (videoId) {
               const prevVideoInfo = setQueryDataForVideoSubscribe(videoId, 'create');
               return () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
            }
         }
      }
   );
   return { ...mutation, createSubscribe: mutation.mutateAsync };
}

function useRemoveSubscribeItem({ videoId, channelId }) {
   const { user } = useAuthState();
   const queryClient = useQueryClient();
   const defaultOptions = useDefaultMutationOptions(videoId, channelId);

   const mutation = useMutation(
      ({ channelId }) => userRequest.delete(`/${user?._id}/subscriptions/${channelId}`),
      {
         ...defaultOptions,
         onMutate: ({ channelId }) => {
            if (videoId) {
               const prevVideoInfo = setQueryDataForVideoSubscribe(videoId, 'remove');
            }
            const prevSubscribeItems = setQueryDataForSubscribeItems(user?._id, channelId);
            return () => {
               queryClient.setQueryData(['subscribe-items', user?._id], prevSubscribeItems);
               if (videoId) queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
            };
         }
      }
   );
   return { ...mutation, removeSubscribe: mutation.mutateAsync };
}

function setQueryDataForSubscribeItems(userId, channelId) {
   const prevSubscribeItems = queryClient.getQueryData(['subscribe-items', userId]);
   queryClient.setQueryData(['subscribe-items', userId], (oldData) => {
      return R.reject((el) => el.channel._id === channelId, oldData);
   });
   return prevSubscribeItems;
}

export { useSubscribeItems, useSubscribeItem, useCreateSubscribeItem, useRemoveSubscribeItem };
