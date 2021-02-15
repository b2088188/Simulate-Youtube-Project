import * as R from 'ramda';
import { queryClient } from '../context';
import { videoRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useAuth from 'context/auth/authContext';

function useCommentSearch(videoId, sort) {
	const result = useQuery({
		queryKey: ['commentSearch', { videoId, sort }],
		queryFn: () =>
			videoRequest({
				url: `/${videoId}/comments`,
				method: 'GET',
				params: {
					sort
				}
			})
				.then(({ data: { data } }) => {
					return data.doc;
				})
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, comments: result.data };
}

function useDefaultMutationOptions(videoId, sort) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => queryClient.invalidateQueries(['commentSearch', { videoId, sort }]),
		onError: (err, variables, recover) => {
			if (typeof recover === 'function') recover();
		}
	};
}

function useCreateComment(videoId, sort, customOptions) {
	const mutation = useMutation((values) => videoRequest.post(`/${videoId}/comments`, values), {
		...useDefaultMutationOptions(videoId, sort),
		...customOptions
	});
	return { ...mutation, create: mutation.mutateAsync };
}

function useUpdateComment(videoId, sort, customOptions) {
	const mutation = useMutation(
		({ commentId, comment }) => videoRequest.patch(`/${videoId}/comments/${commentId}`, comment),
		{
			...useDefaultMutationOptions(videoId, sort),
			...customOptions
		}
	);
	return { ...mutation, update: mutation.mutateAsync };
}

function useDeleteComment(videoId, sort, customOptions) {
	const queryClient = useQueryClient();
	const [{ user }] = useAuth();
	const mutation = useMutation(
		({ commentId }) => videoRequest.delete(`/${videoId}/comments/${commentId}`),
		{
			onSettled: () => {
				queryClient.invalidateQueries(['commentSearch', { videoId, sort }]);
				queryClient.invalidateQueries(['commentLikeItems', { userId: user?._id }]);
			},
			onMutate: ({ commentId }) => {
				const prevCommentItems = queryClient.getQueryData(['commentSearch', { videoId, sort }]);
				queryClient.setQueryData(['commentSearch', { videoId, sort }], (oldData) => {
					return R.reject((el) => el._id === commentId, oldData);
				});
				return () =>
					queryClient.setQueryData(['commentSearch', { videoId, sort }], prevCommentItems);
			},
			onError: (err, variables, recover) => {
				if (typeof recover === 'function') recover();
			},
			...customOptions
		}
	);
	return { ...mutation, remove: mutation.mutate };
}

export { useCommentSearch, useCreateComment, useUpdateComment, useDeleteComment };
