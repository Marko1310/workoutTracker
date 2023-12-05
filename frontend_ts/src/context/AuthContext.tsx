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

  function login(email, password) {
    //TODO: add login logic
    dispatch({ type: 'login', payload: user.data.user });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, error, signup, login, logout }}
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
