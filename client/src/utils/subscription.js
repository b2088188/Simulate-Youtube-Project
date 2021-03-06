import { userRequest } from 'apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAuth from 'context/auth/authContext';

function useSubscribeItems() {
   const [{ user }] = useAuth();

   const result = useQuery({
      queryKey: ['subscribe-items', user?._id],
      queryFn: () => {
         if (user)
            return userRequest
               .get(`/${user?._id}/subscriptions`)
               .then(({ data: { data } }) => data.subscribes)
               .catch(({ response: { data } }) => {
                  throw data;
               });
      },
      placeholderData: []
   });

   return { ...result, subscribeItems: result.data };
}

function useSubscribeItem(channelId) {
   const { subscribeItems } = useSubscribeItems();
   return subscribeItems.find((el) => el.channel._id === channelId) || null;
}

function useDefaultMutationOptionsInVideo(videoId) {
   const queryClient = useQueryClient();
   return {
      onSettled: () => {
         queryClient.invalidateQueries('subscribe-items');
         queryClient.invalidateQueries(['videoInfo', { videoId }]);
      },
      onError: (err, variables, recover) => {
         if (typeof recover === 'function') recover(); // () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
      }
   };
}

function useDefaultMutationOptionsInChannel(channelId) {
   const queryClient = useQueryClient();
   return {
      onSettled: () => {
         queryClient.invalidateQueries('subscribe-items');
         queryClient.invalidateQueries(['channelInfo', { channelId }]);
      },
      onError: (err, variables, recover) => {
         if (typeof recover === 'function') recover(); //() => setQueryData(['channelInfo', { channelId }], prevChannelInfo);
      }
   };
}

function useCreateSubscribeItemInVideo(videoId) {
   const [{ user }] = useAuth();
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ channel }) => userRequest.post(`/${user?._id}/subscriptions`, { channel }),
      {
         ...useDefaultMutationOptionsInVideo(videoId),
         onMutate: () => {
            const prevVideoInfo = queryClient.getQueryData(['videoInfo', { videoId }]);
            queryClient.setQueryData(['videoInfo', { videoId }], (oldData) => {
               const { channel } = oldData;
               return { ...oldData, channel: { ...channel, subscribes: channel.subscribes + 1 } };
            });
            return () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
         }
      }
   );
   return { ...mutation, createSubscribe: mutation.mutateAsync };
}

function useCreateSubscribeItemInChannel(channelId) {
   const [{ user }] = useAuth();
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ channel }) => userRequest.post(`/${user?._id}/subscriptions`, { channel }),
      {
         ...useDefaultMutationOptionsInChannel(channelId),
         onMutate: () => {
            const prevChannelInfo = queryClient.getQueryData(['channelInfo', { channelId }]);
            queryClient.setQueryData(['channelInfo', { channelId }], (oldData) => {
               return { ...oldData, subscribes: oldData.subscribes + 1 };
            });
            return () => queryClient.setQueryData(['channelInfo', { channelId }], prevChannelInfo);
         }
      }
   );
   return { ...mutation, createSubscribe: mutation.mutateAsync };
}

function useRemoveSubscribeItemInVideo(videoId) {
   const [{ user }] = useAuth();
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ channelId }) => userRequest.delete(`/${user?._id}/subscriptions/${channelId}`),
      {
         ...useDefaultMutationOptionsInVideo(videoId),
         onMutate: () => {
            const prevVideoInfo = queryClient.getQueryData(['videoInfo', { videoId }]);
            queryClient.setQueryData(['videoInfo', { videoId }], (oldData) => {
               const { channel } = oldData;
               return { ...oldData, channel: { ...channel, subscribes: channel.subscribes - 1 } };
            });
            return () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
         }
      }
   );
   return { ...mutation, removeSubscribe: mutation.mutateAsync };
}

function useRemoveSubscribeItemInChannel(channelId) {
   const [{ user }] = useAuth();
   const queryClient = useQueryClient();

   const mutation = useMutation(
      ({ channelId }) => userRequest.delete(`/${user?._id}/subscriptions/${channelId}`),
      {
         ...useDefaultMutationOptionsInChannel(channelId),
         onMutate: () => {
            const prevChannelInfo = queryClient.getQueryData(['channelInfo', { channelId }]);
            queryClient.setQueryData(['channelInfo', { channelId }], (oldData) => {
               return { ...oldData, subscribes: oldData.subscribes - 1 };
            });
            return () => queryClient.setQueryData(['channelInfo', { channelId }], prevChannelInfo);
         }
      }
   );
   return { ...mutation, removeSubscribe: mutation.mutateAsync };
}

export {
   useSubscribeItems,
   useSubscribeItem,
   useCreateSubscribeItemInVideo,
   useRemoveSubscribeItemInVideo,
   useCreateSubscribeItemInChannel,
   useRemoveSubscribeItemInChannel
};
