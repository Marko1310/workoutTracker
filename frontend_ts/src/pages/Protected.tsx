import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/');
  }, [isLoading, isAuthenticated]);

  console.log(isAuthenticated);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isAuthenticated && !isLoading) {
    return <>{children}</>;
  }
}

export default Protected;
