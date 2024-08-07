import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import userServices from '../services/userServices';
import { LoginDto, SignupDto } from '../types/auth';
import { UserDto } from '../types/applications';

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
  | { type: 'success'; payload: UserDto }
  | { type: 'error'; payload: any }
  | { type: 'reset' };

type AuthStateType = {
  user: UserDto | null;
  isLoading: boolean;
  error: any;
};

const initialState: AuthStateType = {
  user: null,
  isLoading: true,
  error: null,
};

type AuthContextType = AuthStateType & {
  signup: (data: SignupDto) => Promise<void>;
  login: (data: LoginDto) => Promise<void>;
  clearError: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const reducer = (state: AuthStateType, action: ActionType) => {
  switch (action.type) {
    case ACTION.SUCCESS:
      return {
        ...state,
        user: action.payload,
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
      };
  }
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const verifyUser = async () => {
      dispatch({ type: ACTION.LOADING });
      try {
        const response = await userServices.getUser();
        dispatch({ type: ACTION.SUCCESS, payload: response.data });
      } catch (error: any) {
        dispatch({ type: ACTION.ERROR, payload: error.response.data });
      }
    };

    verifyUser();
  }, []);

  async function signup(data: SignupDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.signup(data);
      dispatch({ type: ACTION.SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  async function login(data: LoginDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.login(data);

      dispatch({ type: ACTION.SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  function clearError() {
    dispatch({ type: ACTION.CLEAR_ERROR });
  }

  async function logout() {
    await userServices.logout();
    dispatch({ type: ACTION.RESET });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signup,
        login,
        clearError,
        logout,
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
