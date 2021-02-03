import { videoRequest } from '../apis/backend';
import { useQuery, useInfiniteQuery } from 'react-query';
import { queryClient } from '../context';

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
			})
				.then(({ data: { data } }) => data)
				.catch(({ response: { data } }) => {
					throw data;
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
					throw data;
				})
	});
	return { ...result, video: result.data };
}

function useHomeVideoSearch(filter) {
	const category = filter ? { category: filter } : {};
	const result = useInfiniteQuery({
		queryKey: ['homeVideos', { filter }],
		queryFn: ({ pageParam = 1 }) =>
			videoRequest({
				method: 'GET',
				params: {
					page: pageParam,
					limit: 16,
					...category
				}
			})
				.then(({ data: { data } }) => {
					return data;
				})
				.catch(({ response: { data } }) => {
					throw data;
				}),
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.data.length > 0) return lastPage.nextPage;
			return false;
		},
		onSuccess: (videos) => {
			const { pages, pageParams } = videos;
			pages[pageParams.length - 1].data.forEach((video) => {
				setQueryDataForVideoInfo(video);
			});
		}
	});
	const { data } = result;
	return { ...result, videos: data?.pages || [] };
}

function setQueryDataForVideoInfo(video) {
	//Once getting the search results, insert all results into the video info query
	//so that we don't have to fetch data we've already had again
	queryClient.setQueryData(['videoInfo', { videoId: video.videoId }], video);
}

function setQueryDataForVideoSubscribe(videoId, type) {
	const prevVideoInfo = queryClient.getQueryData(['videoInfo', { videoId }]);
	queryClient.setQueryData(['videoInfo', { videoId }], (oldData) => {
		const { channel } = oldData;
		return {
			...oldData,
			channel: {
				...channel,
				subscribes: type === 'create' ? channel.subscribes + 1 : channel.subscribes - 1
			}
		};
	});
	return prevVideoInfo;
}

function refetchVideoSearchQuery() {
	// remove old video search query
	queryClient.remoQueries('videoSearch');
	// refetch a new query with empty string
	queryClient.prefetchQuery();
}

export {
	useVideoSearch,
	useVideoInfo,
	useHomeVideoSearch,
	setQueryDataForVideoInfo,
	setQueryDataForVideoSubscribe
};
