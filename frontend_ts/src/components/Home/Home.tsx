import CurrentProgram from './CurrentProgram';
import Heatmap from './Heatmap';
import PreviousWorkout from './PreviousWorkout';

function Home() {
  return (
    <div className='flex flex-col gap-4 p-6 '>
      <CurrentProgram />
      <PreviousWorkout />
      <Heatmap />
    </div>
  );
}

export default Home;
