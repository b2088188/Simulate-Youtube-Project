import { useMutation } from 'react-query';
import useAuth from 'context/auth/authContext';
import { userRequest } from 'apis/backend';

function useUpdateUserData() {
	const [, { setData }] = useAuth();
	const mutation = useMutation((values) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('email', values.email);
		formData.append('photo', values.photo[0]);
		return userRequest.patch('/updateMe', formData).then(({ data: { data } }) => {
			setData(data.user);
			return data.user;
		});
	});
	return { ...mutation, update: mutation.mutate };
}

export { useUpdateUserData };
