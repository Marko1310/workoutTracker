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

  return (
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
  );
}

export default Heatmap;
