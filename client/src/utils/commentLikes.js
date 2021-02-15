import * as R from 'ramda';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAuth from 'context/auth/authContext';
import { userRequest, commentRequest } from 'apis/backend';

function useDefaultMutationOptions(videoId, sort, userId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['commentSearch', { videoId, sort }]);
			queryClient.invalidateQueries(['commentLikeItems', { userId }]);
		},
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') recover();
		}
	};
}

function useCommentLikeItems() {
	const [{ user }] = useAuth();
	const userId = user?._id;
	const result = useQuery({
		queryKey: ['commentLikeItems', { userId }],
		queryFn: () => {
			if (user)
				return userRequest
					.get(`/${userId}/commentlikes`)
					.then(({ data: { data } }) => data.commentLikes)
					.catch(({ response: { data } }) => {
						throw data;
					});
		}
	});
	return { ...result, commentLikes: result.data ?? [] };
}

function useCommentLikeItem(commentId) {
	const { commentLikes } = useCommentLikeItems();
	return commentLikes?.find((el) => el.comment === commentId) || null;
}

function useCreateCommentLike(videoId, sort) {
	const queryClient = useQueryClient();
	const [{ user }] = useAuth();
	const userId = user?._id;
	const mutation = useMutation(({ commentId }) => commentRequest.post(`/${commentId}/likes`), {
		onMutate: ({ commentId }) => {
			const prevCommentItems = queryClient.getQueryData(['commentSearch', { videoId, sort }]);
			queryClient.setQueryData(['commentSearch', { videoId, sort }], (oldData) => {
				const item = oldData.find((el) => el._id === commentId);
				const itemIndex = oldData.findIndex((el) => el._id === commentId);
				return R.update(itemIndex, { ...item, likes: item.likes + 1 }, oldData);
			});
			return () =>
				queryClient.setQueryData(['commentSearch', { videoId, sort }], prevCommentItems);
		},
		...useDefaultMutationOptions(videoId, sort, userId)
	});
	return { ...mutation, createCommentLike: mutation.mutate };
}

function useRemoveCommentLike(videoId, sort) {
	const queryClient = useQueryClient();
	const [{ user }] = useAuth();
	const userId = user?._id;
	const mutation = useMutation(
		({ commentId, likeId }) => commentRequest.delete(`/${commentId}/likes/${likeId}`),
		{
			onMutate: ({ commentId, likeId }) => {
				const prevCommentItems = queryClient.getQueryData(['commentSearch', { videoId, sort }]);
				const prevCommentLikeItems = queryClient.getQueryData(['commentLikeItems', { userId }]);
				queryClient.setQueryData(['commentSearch', { videoId, sort }], (oldData) => {
					const item = oldData.find((el) => el._id === commentId);
					const itemIndex = oldData.findIndex((el) => el._id === commentId);
					return R.update(itemIndex, { ...item, likes: item.likes - 1 }, oldData);
				});
				queryClient.setQueryData(['commentLikeItems', { userId }], (oldData) => {
					return R.reject((el) => el._id === likeId, oldData);
				});
				return () => {
					queryClient.setQueryData(['commentSearch', { videoId, sort }], prevCommentItems);
					queryClient.setQueryData(['commentLikeItems', { userId }], prevCommentLikeItems);
				};
			},
			...useDefaultMutationOptions(videoId, sort, userId)
		}
	);
	return { ...mutation, removeCommentLike: mutation.mutate };
}

export { useCommentLikeItems, useCommentLikeItem, useCreateCommentLike, useRemoveCommentLike };
