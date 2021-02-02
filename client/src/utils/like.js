import { userRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useDefaultMutationOptions(userId, videoId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['like-items', userId]);
			queryClient.invalidateQueries(['videoInfo', { videoId }]);
		}
	};
}

function useLikeItems(userId) {
	const result = useQuery({
		queryKey: ['like-items', userId],
		queryFn: () =>
			userRequest
				.get(`/${userId}/likes`)
				.then(({ data: { data } }) => data.likes)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, likeItems: result.data ?? [] };
}

/* eslint-disable */
function useLikeItem(user, videoId) {
	if (!user) return;
	const { likeItems } = useLikeItems(user._id);
	return likeItems.find((el) => el.videoId === videoId) ?? null;
}

function useCreateLikeItem(user, videoId) {
	if (!user) return;
	const queryClient = useQueryClient();
	const defaultOptions = useDefaultMutationOptions(user._id, videoId);
	const mutation = useMutation(
		(video) =>
			userRequest.post(`/${user._id}/likes`, {
				videoId: video.videoId,
				title: video.title,
				channelTitle: video.channel.title,
				image: video.images,
				publishedAt: video.publishedAt
			}),
		{
			...defaultOptions
		}
	);
	return { ...mutation, createLike: mutation.mutateAsync };
}

function useRemoveLikeItem(user, videoId) {
	if (!user) return;
	const queryClient = useQueryClient();
	const defaultOptions = useDefaultMutationOptions(user._id, videoId);
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user._id}/likes/${videoId}`),
		{
			...defaultOptions
		}
	);
	return { ...mutation, removeLike: mutation.mutateAsync };
}

export { useLikeItems, useLikeItem, useCreateLikeItem, useRemoveLikeItem };
