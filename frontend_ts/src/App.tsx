import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Application from './pages/Application';
import { AuthProvider } from './context/AuthContext';
import Protected from './pages/Protected';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Auth />} />
          <Route
            path='home'
            element={
              <Protected>
                <Application />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
