import * as R from 'ramda';
import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import authReducer from './authReducer';
import useAsync from '../../customhooks/useAsync';
import { Spinner } from '../../design/elements';
import axios from 'axios';
import { REQUEST_RESOLVED, GET_AUTHINFO, LOGOUT_AUTH, AUTH_ERRORRESET } from '../types';

const AuthStore = ({ children }) => {
   const [stateAuth, fetchAuth, dispatchAuth] = useAsync(
      {
         user: null,
         initialAuthCheck: false
      },
      authReducer
   );

   const getInitialAuth = useCallback(
      async function () {
         const { status } = await fetchAuth(axios.get('/api/v1/auth'));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );
   useEffect(() => {
      getInitialAuth();
   }, [getInitialAuth]);

   const login = useCallback(
      async function (values) {
         const { status } = await fetchAuth(axios.post('/api/v1/auth/login', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const signup = useCallback(
      async function (values) {
         const { status } = await fetchAuth(axios.post('/api/v1/auth/signup', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const logout = useCallback(
      async function (values) {
         await fetchAuth(axios.get('/api/v1/auth/logout'));
         dispatchAuth({ type: LOGOUT_AUTH });
      },
      [fetchAuth, dispatchAuth]
   );

   const resetAuthError = useCallback(
      function () {
         dispatchAuth({ type: AUTH_ERRORRESET });
      },
      [dispatchAuth]
   );

   const updateUserData = useCallback(
      async function (values) {
         const formData = new FormData();
         formData.append('name', values.name);
         formData.append('email', values.email);
         formData.append('photo', values.photo[0]);
         fetchAuth(axios.patch('/api/v1/users/updateMe', formData));
      },
      [fetchAuth]
   );

   const value = useMemo(
      () => ({
         user: stateAuth.user,
         statusAuth: stateAuth.status,
         errorAuth: stateAuth.error
      }),
      [stateAuth]
   );

   const actions = useMemo(
      () => ({
         fetchAuth,
         login,
         signup,
         updateUserData,
         logout,
         resetAuthError
      }),
      [login, signup, updateUserData, logout, resetAuthError]
   );

   if (!stateAuth.initialAuthCheck) return <Spinner modifiers='dark' />;

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
