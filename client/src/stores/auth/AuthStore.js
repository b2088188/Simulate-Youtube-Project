import * as R from 'ramda';
import React, { useEffect, useReducer, useMemo } from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import authReducer from './authReducer';
import {
   SIGNUP_SUCCESS,
   LOGIN_SUCCESS,
   LOADUSER_SUCCESS,
   LOGOUT_SUCCESS,
   UPDATE_USERDATASUCCESS,
   NOT_LOGIN,
   LOADING,
   AUTH_FAIL,
   CLEAR_ERROR,
} from '../types';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';

const AuthStore = ({ children }) => {
   const [stateAuth, fetchAuth] = useAsync({
      data: {},
   });

   useEffect(() => {
      fetchAuth(axios.get('/api/v1/auth'));
   }, [fetchAuth]);

   // async function loadUser() {
   //  try {
   //     const {data} = await axios.get('/api/v1/auth');
   //     dispatch({
   //      type: LOADUSER_SUCCESS,
   //      payload: {
   //        user: data.data.user
   //      }
   //     })
   //  }
   //  catch(err) {
   //          dispatch({type: NOT_LOGIN})
   //  }
   // }

   // async function logout() {
   //   try {
   //    const res =  await axios.get('/api/v1/auth/logout');
   //   dispatch({type: LOGOUT_SUCCESS});
   //   }
   //   catch(err) {
   //      dispatch({
   //          type: AUTH_FAIL,
   //          payload: {
   //            message: err.response.data.message
   //          }
   //        })
   //   }
   // }

   // async function updateUserData(values) {
   //    try {
   //      dispatch({type: LOADING});
   //      const formData = new FormData();
   //      formData.append('name', values.name);
   //      formData.append('email', values.email);
   //      formData.append('photo', values.photo[0]);
   //       const {data} = await axios.patch('/api/v1/users/updateMe', formData);
   //       dispatch({
   //        type: UPDATE_USERDATASUCCESS,
   //        payload: {
   //          user: data.data.user
   //        }
   //       })
   //    }
   //    catch(err) {
   //    }
   // }

   // const value = {
   //    loadUser,
   //    updateUserData,
   //    clearError
   // };
   const value = useMemo(
      () => ({
         user: stateAuth.data.user,
         statusAuth: stateAuth.status,
         errorAuth: stateAuth.error,
      }),
      [stateAuth]
   );

   const actions = useMemo(
      () => ({
         fetchAuth,
      }),
      [fetchAuth]
   );

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
