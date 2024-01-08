import WeekChart from './WeekChart';
import Heatmap from './Heatmap';
import Stats from './Stats';

function Dashboard() {
  return (
    <>
      <div className='flex h-fit w-full items-center gap-10'>
        <div className='grid h-full w-full grid-cols-1 gap-2 lg:grid-cols-2'>
          <div className='grid h-fit w-full grid-cols-2 gap-4'>
            <Stats />
            <Stats />
            <Stats />
            <Stats />
          </div>
          <div className='flex h-full items-end lg:items-center'>
            <div className='flex h-80 w-full justify-center lg:h-full lg:items-center'>
              <WeekChart />
            </div>
          </div>
        </div>
      </div>

      <Heatmap />
    </>
  );
}

export default Dashboard;
