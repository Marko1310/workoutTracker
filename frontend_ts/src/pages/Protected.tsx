import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()!;

  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  if (isLoading) {
    return <div>Loading User</div>;
  }

  if (isAuthenticated && !isLoading) {
    return <>{children}</>;
  }
}

export default Protected;
