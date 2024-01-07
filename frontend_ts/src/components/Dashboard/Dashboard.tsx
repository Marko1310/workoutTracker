import getDatesForOngoingWeek from '../../helpers/currentWeekDates';
import Heatmap from './Heatmap';
import Stats from './Stats';

function Dashboard() {
  const { startDate, endDate } = getDatesForOngoingWeek();
  return (
    <>
      <div className='w-full md:max-w-max'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Stats />
          <Stats />
          <Stats />
          <Stats />
        </div>
      </div>
      <div>Chart</div>
      <Heatmap />
    </>
  );
}

export default Dashboard;
