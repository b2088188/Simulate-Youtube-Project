import React, { useEffect, useMemo, useCallback } from 'react';
import { AuthStateProvider, AuthActionProvider } from './authContext';
import { useAsync } from 'utils/hooks';
import { useQueryClient } from 'react-query';
import { FullPageSpinner } from 'components/Spinner';
import { authRequest } from 'apis/backend';

const AuthProvider = ({ children }) => {
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

   const value = useMemo(
      () => ({
         user,
         isLoading,
         isSuccess,
         isError,
         error
      }),
      [user, isLoading, isSuccess, isError, error]
   );

   const actions = useMemo(
      () => ({
         login,
         signup,
         logout,
         setData,
         setError
         //resetAuthError
      }),
      [login, signup, logout, setData, setError]
   );

   if (isIdle || isLoading) return <FullPageSpinner />;

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthProvider;
