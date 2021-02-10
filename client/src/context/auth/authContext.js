import { createContext } from 'react';
import { useContextFactory } from 'utils/hooks';

const AuthStateContext = createContext();
const AuthActionContext = createContext();
AuthStateContext.displayName = 'AuthStateContext';
AuthActionContext.displayName = 'AuthActionContext';

export const AuthStateProvider = AuthStateContext.Provider;
export const AuthActionProvider = AuthActionContext.Provider;
/* eslint-disable */
const useAuthState = useContextFactory('AuthStateContext', AuthStateContext);
const useAuthActions = useContextFactory('AuthActionContext', AuthActionContext);
const useAuth = () => [useAuthState(), useAuthActions()];

export default useAuth;
