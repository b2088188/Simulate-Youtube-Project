import * as R from 'ramda';
import React, {useReducer} from 'react';
import {AuthProvider} from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOADUSER_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USERDATASUCCESS,
  NOT_LOGIN,
  LOADING,
  AUTH_FAIL,
  CLEAR_ERROR
} from '../types';

const InitialState = {
  //token: null,
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null
}

const AuthStore = ({
  children
}) => {	
 const [state, dispatch] = useReducer(authReducer, InitialState);

 async function signUp(values) {
   try {
      const {data} = await axios.post('/api/v1/auth/signup', values);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          //token: data.data.token,
          user: data.data.user
        }
      })
   }
   catch(err) {
     dispatch({
      type: AUTH_FAIL,
      payload: {
        message: err.response.data.message
      }
    })
   }       
 }

 async function login(values) {
   try {
      const {data} = await axios.post('/api/v1/auth/login', values);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          //token: data.data.token,
          user: data.data.user
        }
      })
   }
   catch(err) {
        dispatch({
          type: AUTH_FAIL,
          payload: {
            message: err.response.data.message
          }
        })
   }       
 }

 async function loadUser() {
  try {
     const {data} = await axios.get('/api/v1/auth');     
     dispatch({
      type: LOADUSER_SUCCESS,
      payload: {
        user: data.data.user
      }
     })
  }
  catch(err) {
          dispatch({type: NOT_LOGIN})
  }      
 }

 async function logout() {
   try {
    const res =  await axios.get('/api/v1/auth/logout');
   dispatch({type: LOGOUT_SUCCESS});
   }
   catch(err) {
      dispatch({
          type: AUTH_FAIL,
          payload: {
            message: err.response.data.message
          }
        })
   }       
 }

 async function updateUserData(values) {
    try {
      dispatch({type: LOADING});
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('photo', values.photo[0]);
       const {data} = await axios.patch('/api/v1/users/updateMe', formData);
       dispatch({
        type: UPDATE_USERDATASUCCESS,
        payload: {
          user: data.data.user
        }
       })
    }
    catch(err) {
            
    }
        
 }

 function clearError() {
   dispatch({type: CLEAR_ERROR});
 }


const value = {
   isAuth: state.isAuthenticated,
   user:state.user,
   token: state.token,
   loading: state.loading,
   error: state.error,
   signUp,
   login,
   loadUser,
   logout,
   updateUserData,
   clearError
};
   return (
     <AuthProvider value = {value}>
     	{children}
     </AuthProvider>
   	)
}

export default AuthStore;