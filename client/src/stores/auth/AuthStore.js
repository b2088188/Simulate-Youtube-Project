import React, { useEffect, useMemo, useCallback } from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import authReducer from './authReducer';
import useAsync from '../../customhooks/useAsync';
import { Row } from '../../design/components';
import { Spinner } from '../../design/elements';
import { authRequest, userRequest } from '../../apis/backend';
import { GET_AUTHINFO, LOGOUT_AUTH, AUTH_ERRORRESET, UPDATE_USERDATA } from '../types';

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
         const { status } = await fetchAuth(authRequest.get('/'));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );
   useEffect(() => {
      getInitialAuth();
   }, [getInitialAuth]);

   const login = useCallback(
      async function (values) {
         const { status } = await fetchAuth(authRequest.post('/login', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const signup = useCallback(
      async function (values) {
         const { status } = await fetchAuth(authRequest.post('/signup', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const logout = useCallback(
      async function (values) {
         await fetchAuth(authRequest.get('/logout'));
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
         const { status } = await fetchAuth(userRequest.patch('/updateMe', formData));
         if (status === 'success') dispatchAuth({ type: UPDATE_USERDATA });
      },
      [fetchAuth, dispatchAuth]
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
         login,
         signup,
         updateUserData,
         logout,
         resetAuthError
      }),
      [login, signup, updateUserData, logout, resetAuthError]
   );

   if (!stateAuth.initialAuthCheck)
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
