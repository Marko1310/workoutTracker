import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

const initalState = {
  user: null,
  isAuthenticated: false,
};

//TODO: add types
function reducer(state, action) {
  switch (action.type) {
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

  function login(email, password) {
    //TODO: add logon logic
    dispatch({ type: 'login', payload: 'user' });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
