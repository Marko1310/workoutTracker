import { createContext, useContext, useReducer } from 'react';
import userServices from '../services/userServices';

const AuthContext = createContext(null);

const initalState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

type signupDto = {
  name: string;
  email: string;
  password: string;
};

const ACTION = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  CLEAR_ERROR: 'clear_error',
};

//TODO: add types
function reducer(state, action) {
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
    default:
      break;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initalState,
  );

  async function signup(data: signupDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.signup(data);
      dispatch({ type: ACTION.SUCCESS, payload: response.data.user });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  async function login(data: signupDto) {
    dispatch({ type: ACTION.LOADING });
    try {
      const response = await userServices.login(data);
      dispatch({ type: ACTION.SUCCESS, payload: response.data.user });
    } catch (error: any) {
      dispatch({ type: ACTION.ERROR, payload: error.response.data });
    }
  }

  function clearError() {
    dispatch({ type: ACTION.CLEAR_ERROR });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthPriovider');
  return context;
}

export { AuthProvider, useAuth };
