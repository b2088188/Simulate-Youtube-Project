import { videoRequest } from '../apis/backend';
import { useQuery, useInfiniteQuery } from 'react-query';

function useVideoSearch(q, sort) {
	const result = useInfiniteQuery({
		queryKey: ['videoSearch', { q, sort }],
		queryFn: ({ pageParam = 1 }) =>
			videoRequest({
				method: 'GET',
				params: {
					q,
					page: pageParam,
					sort
				}
			}).then(({ data: { data } }) => {
				return data;
			}),
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.data.length > 0) return lastPage.nextPage;
			return false;
		}
	});
	const { data } = result;
	return { ...result, videos: data?.pages || [] };
}

function useVideoInfo(videoId) {
	const result = useQuery({
		queryKey: ['videoInfo', { videoId }],
		queryFn: () =>
			videoRequest
				.get(`/${videoId}`)
				.then(({ data: { data } }) => data.video)
				.catch(({ response: { data } }) => {
					throw new Error(data.message);
				})
	});
	return { ...result, video: result.data };
}

export { useVideoSearch, useVideoInfo };
