import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkoutLogsByYear } from '../../queries/workoutLogsByYearQuerie';
import { Tooltip as MuiTooltip } from '@mui/material';
import ActivityCalendar from 'react-activity-calendar';
import { useHeatmapData } from '../../hooks/useHeatmapData';

function Heatmap() {
  const { user } = useAuth()!;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { workoutLogsByYear, isLoading, error } = useWorkoutLogsByYear(
    user?.id,
    year,
  );

  const { heatMapData } = useHeatmapData(year, workoutLogsByYear);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value, 10));
  };

  return (
    <div className='w-full border-2 border-blue-400'>
      <div className='flex flex-col items-center'>
        <div className='mb-4 flex w-full justify-between'>
          <h2>Your workout calendar:</h2>

          <select id='year-select' onChange={handleYearChange}>
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear - 2}>{currentYear - 2}</option>
          </select>
        </div>
        {isLoading ? (
          'loading'
        ) : (
          <ActivityCalendar
            data={heatMapData}
            blockSize={14}
            blockMargin={5}
            theme={{
              light: ['#C3C0BF', '#F25B3B'],
              dark: ['#C3C0BF', '#F25B3B'],
            }}
            renderBlock={(block, activity) => (
              <MuiTooltip
                title={`${activity.count} workout on ${activity.date}`}
              >
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
