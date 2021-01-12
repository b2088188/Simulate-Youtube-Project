import * as R from 'ramda';
import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import useAsync from '../../customhooks/useAsync';
import { Spinner } from '../../design/elements';
import axios from 'axios';

const AuthStore = ({ children }) => {
   const [stateAuth, fetchAuth] = useAsync({
      data: {}
   });
   const [initialAuthCheck, setInitialAuthCheck] = useState(false);

   const getInitialAuth = useCallback(
      async function () {
         await fetchAuth(axios.get('/api/v1/auth'));
         setInitialAuthCheck(true);
      },
      [fetchAuth]
   );
   useEffect(() => {
      getInitialAuth();
   }, [getInitialAuth]);

   const login = useCallback(
      async function (values) {
         fetchAuth(axios.post('/api/v1/auth/login', values));
      },
      [fetchAuth]
   );

   const signup = useCallback(
      async function (values) {
         fetchAuth(axios.post('/api/v1/auth/signup', values));
      },
      [fetchAuth]
   );

   const logout = useCallback(
      async function (values) {
         fetchAuth(axios.get('/api/v1/auth/logout'));
      },
      [fetchAuth]
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
         user: stateAuth.data.user,
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
         logout
      }),
      [login, signup, updateUserData, logout]
   );

   if (!initialAuthCheck) return <Spinner modifiers='dark' />;

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
