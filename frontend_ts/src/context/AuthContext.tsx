import { createContext, useContext, useReducer } from 'react';
import userServices from '../services/userServices';

const AuthContext = createContext(null);

const initalState = {
  user: null,
  isAuthenticated: false,
};

type signupDto = {
  name: string;
  email: string;
  password: string;
};

//TODO: add types
function reducer(state, action) {
  switch (action.type) {
    case 'signup':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initalState,
  );

  async function signup(data: signupDto) {
    const user = await userServices.signup(data);
    dispatch({ type: 'signup', payload: user.data.user });
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
      value={{ user, isAuthenticated, signup, login, logout }}
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
