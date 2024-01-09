import { useState } from 'react';
import { useHeatmapData } from '../../hooks/useHeatmapData';
import { useWorkoutLogsByYear } from '../../queries/workoutQueries';
import ActivityCalendar from 'react-activity-calendar';
import { Tooltip as MuiTooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Heatmap() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { workoutLogsByYear, isLoading } = useWorkoutLogsByYear(year);

  const { heatMapData } = useHeatmapData(year, workoutLogsByYear);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value, 10));
  };

  return (
    <div className='w-full rounded-xl border border-border p-6 shadow-lg'>
      <div className='flex flex-col items-center'>
        <div className='mb-4 flex w-full justify-between'>
          <h2 className='text-primary-foreground text-base font-semibold '>
            Workout calendar
          </h2>
          <div className='flex items-center gap-2'>
            <p>Select a year: </p>
            <select
              className='border border-border p-1'
              id='year-select'
              onChange={handleYearChange}
            >
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear - 1}>{currentYear - 1}</option>
              <option value={currentYear - 2}>{currentYear - 2}</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <CircularProgress size={80} />
        ) : (
          <ActivityCalendar
            data={heatMapData}
            blockSize={14}
            blockMargin={5}
            theme={{
              light: ['#C3C0BF', '#fb923c'],
              dark: ['#C3C0BF', '#fb923c'],
            }}
            renderBlock={(block, activity) => (
              <MuiTooltip title={` Workout completed on ${activity.date}`}>
                {block}
              </MuiTooltip>
            )}
            hideTotalCount
            hideColorLegend
            showWeekdayLabels
          />
        )}
      </div>
    </div>
  );
}

export default Heatmap;
