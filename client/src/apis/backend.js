import axios from 'axios';

export const authRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth`,
   withCredentials: true
});
export const userRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`,
   withCredentials: true
});
export const channelRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/channels`
});

export const videoRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/videos`,
   withCredentials: true
});

export const commentRequest = axios.create({
   baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/comments`,
   withCredentials: true
});
