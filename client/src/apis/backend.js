import axios from 'axios';

export const authRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth`
});
export const userRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`
});
