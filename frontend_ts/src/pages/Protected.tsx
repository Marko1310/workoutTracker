import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, verifyUser } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      await verifyUser();
      if (!isAuthenticated) {
        navigate('/');
      }
    })();
  }, [isAuthenticated, navigate, verifyUser]);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isAuthenticated && !isLoading) {
    return <>{children}</>;
  }
}

export default Protected;
