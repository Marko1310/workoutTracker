import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkoutLogsByYear } from '../../queries/workoutLogsByYearQuerie';
import { Tooltip as MuiTooltip } from '@mui/material';
import ActivityCalendar from 'react-activity-calendar';
import { useHeatmapData } from '../../hooks/useHeatmapData';

function Heatmap() {
  const { user } = useAuth()!;
  const [year, setYear] = useState(new Date().getFullYear());

  const { workoutLogsByYear, isLoading, error } = useWorkoutLogsByYear(
    user?.id,
    year,
  );

  const { heatMapData } = useHeatmapData(year, workoutLogsByYear);
  const handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };
  return (
    <div className='w-full border-2 border-blue-400'>
      <div className='flex flex-col items-center'>
        <div className='mb-4 flex w-full justify-between'>
          <h2>Your workout calendar by year:</h2>

          <select id='year-select' onChange={handleYearChange}>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
          </select>
        </div>

        <ActivityCalendar
          data={heatMapData}
          blockSize={14}
          blockMargin={5}
          theme={{
            light: ['#C3C0BF', '#F25B3B'],
            dark: ['#C3C0BF', '#F25B3B'],
          }}
          renderBlock={(block, activity) => (
            <MuiTooltip title={`${activity.count} workout on ${activity.date}`}>
              {block}
            </MuiTooltip>
          )}
          hideTotalCount
          hideColorLegend
          showWeekdayLabels
        />
      </div>
    </div>
  );
}

export default Heatmap;
