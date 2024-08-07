import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Protected({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()!;

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <CircularProgress color='warning' size={80} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={'/'} />;
  }

  if (user && !isLoading) {
    return <>{children}</>;
  }
}

export default Protected;
