import * as R from 'ramda';
import React, {
   useState,
   useEffect,
   useReducer,
   useMemo,
   useCallback,
} from 'react';
import { AuthStateProvider } from './authStateContext';
import { AuthActionProvider } from './authActionContext';
import useAsync from '../../customhooks/useAsync';
import axios from 'axios';
import { Spinner } from '../../design/elements';

const AuthStore = ({ children }) => {
   const [stateAuth, fetchAuth] = useAsync({
      data: {},
   });
   const [initialAuthCheck, setInitialAuthCheck] = useState(false);

   useEffect(() => {
      fetchAuth(axios.get('/api/v1/auth'));
   }, [fetchAuth]);

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
         errorAuth: stateAuth.error,
      }),
      [stateAuth]
   );

   const actions = useMemo(
      () => ({
         fetchAuth,
         updateUserData,
      }),
      [fetchAuth, updateUserData]
   );

   if (!stateAuth.data.user && stateAuth.status === 'pending')
      return <Spinner modifiers='dark' />;

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
