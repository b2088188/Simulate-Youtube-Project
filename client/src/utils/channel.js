import { channelRequest } from 'apis/backend';
import { setQueryDataForVideoInfo } from './video';
import { useQuery } from 'react-query';
import { queryClient } from 'context';

function useChannelInfo(channelId) {
   const result = useQuery({
      queryKey: ['channelInfo', { channelId }],
      queryFn: () =>
         channelRequest
            .get(`/${channelId}`)
            .then(({ data: { data } }) => data.channel)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, channel: result.data };
}

function useChannelVideos(channelId) {
   const result = useQuery({
      queryKey: ['channelVideos', { channelId }],
      queryFn: () =>
         channelRequest
            .get(`/${channelId}/videos`)
            .then(({ data: { data } }) => data.data)
            .catch(({ response: { data } }) => {
               throw data;
            }),
      onSuccess: (videos) => {
         //Once getting the video results, insert all results into the video info query
         for (let video of videos) {
            setQueryDataForVideoInfo(video);
         }
      }
   });
   return { ...result, channelVideos: result.data };
}

function setQueryDataForChannelSubscribe(channelId, type) {
   const prevChannelInfo = queryClient.getQueryData(['channelInfo', { channelId }]);
   queryClient.setQueryData(['channelInfo', { channelId }], (oldData) => {
      return {
         ...oldData,
         subscribes: type === 'create' ? oldData.subscribes + 1 : oldData.subscribes - 1
      };
   });
   return prevChannelInfo;
}

export { useChannelInfo, useChannelVideos, setQueryDataForChannelSubscribe };
