import { useQuery } from '@tanstack/react-query';
import Main from '../components/Application/Main';
import Navbar from '../components/Application/Navbar';
import Sidebar from '../components/Application/Sidebar';
import { useAuth } from '../context/AuthContext';
import workoutServices from '../services/workoutServices';

function Application() {
  const { user } = useAuth()!;
  const { data, error, loading } = useQuery({
    queryKey: ['workouts'],
    queryFn: workoutServices.getAllWorkouts(user.id),
  });

  return (
    <div className='flex flex-col'>
      <Navbar user={user} />
      <div className='flex flex-row'>
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  );
}

export default Application;
