import * as R from 'ramda';
import { videoRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queryClient } from '../context';

function useCommentSearch(videoId) {
	const result = useQuery({
		queryKey: ['commentSearch', { videoId }],
		queryFn: () =>
			videoRequest
				.get(`/${videoId}/comments`)
				.then(({ data: { data } }) => data.doc)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, comments: result.data };
}

function useDefaultMutationOptions(videoId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => queryClient.invalidateQueries(['commentSearch', { videoId }])
	};
}

function useCreateComment(videoId, customOptions) {
	const defaultOptions = useDefaultMutationOptions(videoId);
	const mutation = useMutation((values) => videoRequest.post(`/${videoId}/comments`, values), {
		...defaultOptions,
		...customOptions
	});
	return { ...mutation, create: mutation.mutateAsync };
}

function useUpdateComment(videoId, customOptions) {
	const defaultOptions = useDefaultMutationOptions(videoId);
	const mutation = useMutation(
		({ commentId, comment }) => videoRequest.patch(`/${videoId}/comments/${commentId}`, comment),
		{
			...defaultOptions,
			...customOptions
		}
	);
	return { ...mutation, update: mutation.mutateAsync };
}

function useDeleteComment(videoId, customOptions) {
	const defaultOptions = useDefaultMutationOptions(videoId);
	const mutation = useMutation(
		({ commentId }) => videoRequest.delete(`/${videoId}/comments/${commentId}`),
		{
			...defaultOptions,
			...customOptions,
			onMutate: ({ commentId }) => {
				queryClient.setQueryData(['commentSearch', { videoId }], (oldData) => {
					return R.reject((el) => el._id === commentId, oldData);
				});
			}
		}
	);
	return { ...mutation, remove: mutation.mutate };
}

export { useCommentSearch, useCreateComment, useUpdateComment, useDeleteComment };
