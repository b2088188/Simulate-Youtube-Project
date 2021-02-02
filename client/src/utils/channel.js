import { channelRequest } from '../apis/backend';
import { useQuery } from 'react-query';

function useChannelInfo(channelId) {
   const result = useQuery({
      queryKey: ['channelInfo', { channelId }],
      queryFn: () =>
         channelRequest
            .get(`/${channelId}`)
            .then(({ data: { data } }) => data.channel)
            .catch(({ response: { data } }) => {
               throw data;
            }),
      retry: false
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
      retry: false
   });
   return { ...result, channelVideos: result.data };
}

export { useChannelInfo, useChannelVideos };
