import WeekChart from './WeekChart';
import Heatmap from './Heatmap';
import Stats from './Stats';
import {
  useGetSetCount,
  useGetTotalReps,
  useGetTotalWeight,
} from '../../queries/sessionQueries';
import { useGetWorkoutLogCount } from '../../queries/workoutQueries';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ScaleIcon from '@mui/icons-material/Scale';

function Dashboard() {
  const { setCount, isLoading: isLoadingSets } = useGetSetCount();
  const { totalReps, isLoading: isLoadingReps } = useGetTotalReps();
  const { totalWeight, isLoading: isLoadingWeight } = useGetTotalWeight();
  const { workoutLogCount, isLoading: isLoadingLogCount } =
    useGetWorkoutLogCount();

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex h-fit w-full items-center gap-10'>
        <div className='grid h-full w-full grid-cols-1 gap-2 lg:grid-cols-2'>
          <div className='grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-2'>
            <Stats
              data={workoutLogCount}
              isLoading={isLoadingLogCount}
              title='Total number of workouts done'
              icon={ChecklistIcon}
              color='bg-orange-100'
            />
            <Stats
              data={setCount}
              isLoading={isLoadingSets}
              title='Total number of sets'
              icon={EventAvailableIcon}
              color='bg-violet-100'
            />
            <Stats
              data={totalReps}
              isLoading={isLoadingReps}
              title='Total number of reps'
              icon={ImportExportIcon}
              color='bg-pink-100'
            />
            <Stats
              data={totalWeight}
              isLoading={isLoadingWeight}
              title='Total weight lifted (kg)'
              icon={ScaleIcon}
              color='bg-green-50'
            />
          </div>
          <div className='flex h-full items-end lg:items-center'>
            <div className='flex h-80 w-full justify-center lg:h-full lg:items-center'>
              <WeekChart />
            </div>
          </div>
        </div>
      </div>

      <Heatmap />
    </div>
  );
}

export default Dashboard;
