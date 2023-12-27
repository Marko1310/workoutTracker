import CurrentProgram from './CurrentProgram';
import PreviousWorkout from './PreviousWorkout';
import User from './User';

function Home() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <User />
      <CurrentProgram />
      <PreviousWorkout />
    </div>
  );
}

export default Home;
