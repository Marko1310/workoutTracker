import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { logout } = useAuth()!;

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Dashboard;
