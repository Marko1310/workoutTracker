import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Application from './pages/Application';
import { AuthProvider } from './context/AuthContext';
import Protected from './pages/Protected';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
