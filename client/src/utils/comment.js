import { videoRequest } from '../apis/backend';
import { useQuery, useMutation, useQueryClient } from 'react-query';

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

export { useCommentSearch, useCreateComment, useUpdateComment };

// const updateComment = useCallback(
//    async function (videoId, commentId, values) {
//       const { status } = await fetchComments(
//          videoRequest.patch(`/${videoId}/comments/${commentId}`, values)
//       );
//       if (status === 'success') dispatchComments({ type: UPDATE_COMMENT });
//    },
//    [fetchComments, dispatchComments]
// );

// const deleteComment = useCallback(
//    async function (videoId, commentId) {
//       await fetchComments(videoRequest.delete(`/${videoId}/comments/${commentId}`));
//       dispatchComments({ type: DELETE_COMMENT, payload: { commentId } });
//    },
//    [fetchComments, dispatchComments]
// );
