import React, { useEffect, useMemo, useCallback } from 'react';
import { AuthStateProvider, AuthActionProvider } from './authContext';
import { useAsync } from 'utils/hooks';
import { FullPageSpinner } from 'components/Spinner';
import { authRequest, userRequest } from 'apis/backend';
import { queryClient } from 'context';

async function getInitialAuth() {
   try {
      const {
         data: { data }
      } = await authRequest.get('/');
      // Getting the user data and user's like items
      // Inserting like items into cache
      queryClient.setQueryData('like-items', data.likes);
      return data.user;
   } catch (err) {
      return;
   }
}

// Start fetching user data before component mounted,
const userPromise = getInitialAuth();

const AuthProvider = ({ children }) => {
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

   useEffect(() => {
      run(userPromise);
   }, [run]);

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
