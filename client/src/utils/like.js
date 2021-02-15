import * as R from 'ramda';
import { userRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAuth from 'context/auth/authContext';

function useLikeItems() {
	const [{ user }] = useAuth();
	const result = useQuery({
		queryKey: ['like-items', user?._id],
		queryFn: () => {
			if (user)
				return userRequest
					.get(`/${user?._id}/likes`)
					.then(({ data: { data } }) => data.likes)
					.catch(({ response: { data } }) => {
						throw data;
					});
		}
	});
	return { ...result, likeItems: result.data ?? [] };
}

function useLikeItem(videoId) {
	const { likeItems } = useLikeItems();
	return likeItems.find((el) => el.videoId === videoId) ?? null;
}

function useDefaultMutationOptionsInVideo(videoId, userId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['like-items', userId]);
			queryClient.invalidateQueries(['videoInfo', { videoId }]);
		},
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') recover(); // () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
		}
	};
}

function useDefaultMutationOptions(userId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['like-items', userId]);
		},
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') recover(); // () => queryClient.setQueryData(['videoInfo', { videoId }], prevVideoInfo);
		}
	};
}

function useCreateLikeItemInVideo(videoId) {
	const [{ user }] = useAuth();
	const queryClient = useQueryClient();
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
			...useDefaultMutationOptionsInVideo(videoId, user?._id),
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
	const [{ user }] = useAuth();
	const queryClient = useQueryClient();
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user?._id}/likes/${videoId}`),
		{
			...useDefaultMutationOptions(user?._id),
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
	const [{ user }] = useAuth();
	const queryClient = useQueryClient();
	const mutation = useMutation(
		({ videoId }) => userRequest.delete(`/${user?._id}/likes/${videoId}`),
		{
			...useDefaultMutationOptionsInVideo(videoId, user?._id),
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
