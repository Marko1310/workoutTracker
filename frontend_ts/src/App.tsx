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
            path='app'
            element={
              <Protected>
                <Application />
              </Protected>
            }
          >
            <Route index path='home' element={<p>Home</p>} />
            <Route path='dashboard' element={<p>Dashboard</p>} />
            <Route path='routines' element={<p>Routines</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
