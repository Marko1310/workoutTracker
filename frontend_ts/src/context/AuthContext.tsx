import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import userServices from '../services/userServices';
import { LoginDto, SignupDto } from '../types/auth';

const ACTION = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  CLEAR_ERROR: 'clear_error',
  RESET: 'reset',
} as const;

type ActionType =
  | { type: 'loading' }
  | { type: 'clear_error' }
  | { type: 'success'; payload: string }
  | { type: 'error'; payload: any }
  | { type: 'reset' };

type AuthStateType = {
  user: null | string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
};

const initalState: AuthStateType = {
  user: null,
  isAuthenticated: localStorage.getItem('user') !== null,
  isLoading: false,
  error: null,
};

type AuthContextType = AuthStateType & {
  signup: (data: SignupDto) => Promise<void>;
  login: (data: LoginDto) => Promise<void>;
  clearError: () => void;
  logout: () => void;
  verifyUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const reducer = (state: AuthStateType, action: ActionType) => {
  switch (action.type) {
    case ACTION.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case ACTION.ERROR:
      return { ...state, isLoading: false, error: action.payload };

    case ACTION.CLEAR_ERROR:
      return { ...state, error: null };

    case ACTION.LOADING:
      return { ...state, isLoading: true, error: false };

    case ACTION.RESET:
      return {
        ...state,
        isLoading: false,
        error: false,
        user: null,
        isAuthenticated: false,
      };
  }
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initalState,
  );

  async function signup(data: SignupDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.signup(data);
      userServices.addUserToLocalStorage(response.data.user);
      dispatch({ type: ACTION.SUCCESS, payload: response.data.user });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  async function login(data: LoginDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.login(data);
      userServices.addUserToLocalStorage(response.data.user);
      dispatch({ type: ACTION.SUCCESS, payload: response.data.user });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  function clearError() {
    dispatch({ type: ACTION.CLEAR_ERROR });
  }

  async function logout() {
    await userServices.logout();
    userServices.removeUserFromLocalStorage();
    dispatch({ type: ACTION.RESET });
  }

  const verifyUser = useCallback(async () => {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.getCurrentUser();
      userServices.addUserToLocalStorage(response.data.user);
      dispatch({ type: ACTION.SUCCESS, payload: response.data.user });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signup,
        login,
        clearError,
        logout,
        verifyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
