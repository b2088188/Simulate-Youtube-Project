import * as R from 'ramda';
import { userRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useDefaultMutationOptions() {
   const queryClient = useQueryClient();
   return {
      onSettled: () => queryClient.invalidateQueries('subscribe-items'),
      onError: (err, variables, recover) => {
         if (typeof recover === 'function') {
            // () => queryClient.setQueryData(['subscribe-items', user._id], prevSubscribeItems);
            recover();
         }
      }
   };
}

function useSubscribeItems(userId) {
   const result = useQuery({
      queryKey: ['subscribe-items', userId],
      queryFn: () =>
         userRequest
            .get(`/${userId}/subscriptions`)
            .then(({ data: { data } }) => data.subscribes)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, userSubscriptions: result.data ?? [] };
}

/* eslint-disable */
function useSubscribeItem(user, channelId) {
   if (!user) return null;
   const { userSubscriptions } = useSubscribeItems(user.id);
   return userSubscriptions.find((el) => el.channel._id === channelId) ?? null;
}

function useCreateSubscribeItem(user) {
   const queryClient = useQueryClient();
   const defaultOptions = useDefaultMutationOptions();
   if (!user) return null;
   const mutation = useMutation(
      ({ channel }) => userRequest.post(`/${user._id}/subscriptions`, { channel }),
      {
         ...defaultOptions
      }
   );
   return { ...mutation, createSubscribe: mutation.mutateAsync };
}

function useRemoveSubscribeItem(user) {
   const queryClient = useQueryClient();
   const defaultOptions = useDefaultMutationOptions();
   if (!user) return null;
   const mutation = useMutation(
      ({ channelId }) => userRequest.delete(`/${user._id}/subscriptions/${channelId}`),
      {
         ...defaultOptions,
         onMutate: ({ channelId }) => {
            const prevSubscribeItems = queryClient.getQueryData(['subscribe-items', user._id]);
            queryClient.setQueryData(['subscribe-items', user._id], (oldData) => {
               return R.reject((el) => el.channel._id === channelId, oldData);
            });
            return () =>
               queryClient.setQueryData(['subscribe-items', user._id], prevSubscribeItems);
         }
      }
   );
   return { ...mutation, removeSubscribe: mutation.mutateAsync };
}

export { useSubscribeItems, useSubscribeItem, useCreateSubscribeItem, useRemoveSubscribeItem };
