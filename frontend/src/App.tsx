import Protected from './pages/Protected';
import Auth from './pages/Auth';
import Application from './pages/Application';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Programs from './components/Programs/Programs';
import WorkoutSession from './components/Session/WorkoutSession';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Notifications from './components/Shared/Notifications';
import { DarkModeProvider } from './context/DarkModeContext';

const queryCLient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
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
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='programs' element={<Programs />} />
                <Route path='session/:workoutId' element={<WorkoutSession />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <Notifications />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
