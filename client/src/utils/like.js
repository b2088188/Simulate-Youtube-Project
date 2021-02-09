import * as R from 'ramda';
import { userRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthState } from '../stores/auth/authStateContext';

function useLikeItems() {
	const { user } = useAuthState();
	const result = useQuery({
		queryKey: ['like-items', user?._id],
		queryFn: () =>
			userRequest
				.get(`/${user?._id}/likes`)
				.then(({ data: { data } }) => data.likes)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, likeItems: result.data ?? [] };
}

/* eslint-disable */
function useLikeItem(videoId) {
	const { user } = useAuthState();
	if (!user) return null;
	const { likeItems } = useLikeItems();
	return likeItems.find((el) => el.videoId === videoId) ?? null;
}

function useCreateLikeItemInVideo(videoId) {
	const { user } = useAuthState();
	const queryClient = useQueryClient();
	//const defaultOptions = useDefaultMutationOptions(user?._id, videoId);
	const mutation = useMutation(
		(video) =>
			userRequest.post(`/${user?._id}/likes`, {
				videoId: video.videoId,
				title: video.title,
				channelTitle: video.channel.title,
				image: video.images,
				publishedAt: video.publishedAt
			}),
		{
			onSettled: () => {
				queryClient.invalidateQueries(['like-items', user?._id]);
				queryClient.invalidateQueries(['videoInfo', { videoId }]);
			},
			onError: (err, variables, recover) => {
				if (typeof recover === 'function') {
					() => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
					recover();
				}
			},
			onMutate: () => {
				const prevVideoInfo = queryClient.getQueryData(['videoInfo', { videoId }]);
				queryClient.setQueryData(['videoInfo', { videoId }], (oldData) => {
					return { ...oldData, likes: oldData.likes + 1 };
				});
				return () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
			}
		}
	);
	return { ...mutation, createLike: mutation.mutateAsync };
}

function useRemoveLikeItem() {
	const { user } = useAuthState();

	const queryClient = useQueryClient();
	//const defaultOptions = useDefaultMutationOptions(user?._id, videoId);
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user?._id}/likes/${videoId}`),
		{
			onSettled: () => {
				queryClient.invalidateQueries(['like-items', user?._id]);
			},
			onError: (err, variables, recover) => {
				if (typeof recover === 'function') recover(); //() => queryClient.setQueryData(['like-items', user?._id], prevLikeItems);
			},
			onMutate: ({ videoId }) => {
				const prevLikeItems = queryClient.getQueryData(['like-items', user?._id]);
				queryClient.setQueryData(['like-items', user?._id], (oldData) => {
					return R.reject((el) => el.videoId === videoId, oldData);
				});
				return () => queryClient.setQueryData(['like-items', user?._id], prevLikeItems);
			}
		}
	);
	return { ...mutation, removeLike: mutation.mutateAsync };
}

function useRemoveLikeItemInVideo(videoId) {
	const { user } = useAuthState();

	const queryClient = useQueryClient();
	//const defaultOptions = useDefaultMutationOptions(user?._id, videoId);
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user?._id}/likes/${videoId}`),
		{
			onSettled: () => {
				queryClient.invalidateQueries(['like-items', user?._id]);
				queryClient.invalidateQueries(['videoInfo', { videoId }]);
			},
			onError: (err, variables, recover) => {
				if (typeof recover === 'function') {
					() => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
					recover();
				}
			},
			onMutate: () => {
				const prevVideoInfo = queryClient.getQueryData(['videoInfo', { videoId }]);
				queryClient.setQueryData(['videoInfo', { videoId }], (oldData) => {
					if (!oldData) return;
					return { ...oldData, likes: oldData.likes - 1 };
				});
				return () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
			}
		}
	);
	return { ...mutation, removeLike: mutation.mutateAsync };
}

export {
	useLikeItems,
	useLikeItem,
	useRemoveLikeItem,
	useCreateLikeItemInVideo,
	useRemoveLikeItemInVideo
};
