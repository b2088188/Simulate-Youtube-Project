import React, { useEffect, useMemo, useCallback } from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import { useAsync } from '../../utils/hooks';
import { useQueryClient } from 'react-query';
import { Row } from '../../design/components';
import { Spinner } from '../../design/elements';
import { authRequest, userRequest } from '../../apis/backend';
import { GET_AUTHINFO, LOGOUT_AUTH, AUTH_ERRORRESET, UPDATE_USERDATA } from '../types';
import axios from 'axios';

const AuthStore = ({ children }) => {
   const queryClient = useQueryClient();
   const {
      data: user,
      error,
      isLoading,
      isIdle,
      isError,
      isSuccess,
      run,
      setData,
      setError
   } = useAsync();

   const getInitialAuth = useCallback(async function () {
      try {
         const {
            data: { data }
         } = await authRequest.get('/');
         return data.user;
      } catch (err) {
         return;
      }
   }, []);

   useEffect(() => {
      run(getInitialAuth());
   }, [getInitialAuth, run]);

   const login = useCallback(
      async function (values) {
         try {
            const {
               data: { data }
            } = await authRequest.post('/login', values);
            setData(data.user);
         } catch ({ response: { data } }) {
            setError(data.message);
         }
      },
      [setData, setError]
   );

   const signup = useCallback(
      async function (values) {
         try {
            const {
               data: { data }
            } = await authRequest.post('/signup', values);
            setData(data.user);
         } catch ({ response: { data } }) {
            setError(data.message);
         }
      },
      [setData, setError]
   );

   const logout = useCallback(
      async function (values) {
         queryClient.clear();
         try {
            await authRequest.get('/logout');
            setData(null);
         } catch (err) {
            setData(null);
         }
      },
      [setData, queryClient]
   );

   // const resetAuthError = useCallback(
   //    function () {
   //       dispatchAuth({ type: AUTH_ERRORRESET });
   //    },
   //    [dispatchAuth]
   // );

   const updateUserData = useCallback(
      async function (values) {
         const prevUserData = { ...user };
         try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('photo', values.photo[0]);
            const {
               data: { data }
            } = await userRequest.patch('/updateMe', formData);
            setData(data.user);
         } catch (err) {
            setData(prevUserData);
         }
      },
      [setData]
   );

   const value = useMemo(
      () => ({
         user,
         isLoading,
         isError,
         error
      }),
      [user, isLoading, isError, error]
   );

   const actions = useMemo(
      () => ({
         login,
         signup,
         updateUserData,
         logout
         //resetAuthError
      }),
      [login, signup, logout, updateUserData]
   );

   if (isIdle || isLoading)
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
