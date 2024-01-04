import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Application from './pages/Application';
import { AuthProvider } from './context/AuthContext';
import Protected from './pages/Protected';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home/Home';
import Programs from './components/Programs/Programs';
import Session from './components/Session/Session';

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
              <Route index path='home' element={<Home />} />
              <Route path='dashboard' element={<p>Dashboard</p>} />
              <Route path='programs' element={<Programs />} />
              <Route path='session/:workoutId' element={<Session />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
