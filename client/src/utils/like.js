import { userRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthState } from '../stores/auth/authStateContext';

function useDefaultMutationOptions(userId, videoId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['like-items', userId]);
			queryClient.invalidateQueries(['videoInfo', { videoId }]);
		},
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') {
				// () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
				recover();
			}
		}
	};
}

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

	const { likeItems } = useLikeItems();
	return likeItems.find((el) => el.videoId === videoId) ?? null;
}

function useCreateLikeItem(videoId) {
	const { user } = useAuthState();

	const queryClient = useQueryClient();
	const defaultOptions = useDefaultMutationOptions(user?._id, videoId);
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
			...defaultOptions,
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

function useRemoveLikeItem(videoId) {
	const { user } = useAuthState();

	const queryClient = useQueryClient();
	const defaultOptions = useDefaultMutationOptions(user?._id, videoId);
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user?._id}/likes/${videoId}`),
		{
			...defaultOptions,
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

export { useLikeItems, useLikeItem, useCreateLikeItem, useRemoveLikeItem };
