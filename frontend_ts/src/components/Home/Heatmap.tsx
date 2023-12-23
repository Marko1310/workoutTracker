import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkoutLogsByYear } from '../../queries/workoutLogsByYearQuerie';
import { Tooltip as MuiTooltip } from '@mui/material';
import ActivityCalendar, { Activity, Level } from 'react-activity-calendar';

function Heatmap() {
  const { user } = useAuth()!;
  const [year, setYear] = useState(new Date().getFullYear());

  const { workoutLogsByYear, isLoading, error } = useWorkoutLogsByYear(
    user?.id,
    year,
  );

  const formatData = workoutLogsByYear
    ? workoutLogsByYear.map((log) => {
        const dateObject = new Date(log.createDateTime);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return { count: 1, date: formattedDate, level: 4 as Level };
      })
    : [];

  function generateHeatmapSpan(date: string, formatData: Activity[]) {
    const count = formatData[0]?.date === date ? 1 : 0;
    const level = formatData[0]?.date === date ? 4 : (0 as Level);

    return {
      count,
      date,
      level,
    };
  }

  function heatmapSpan(year: number, formatData: Activity[]) {
    const firstDate = `${year}-01-01`;
    const lastDate = `${year}-12-31`;

    const spanStart = generateHeatmapSpan(firstDate, formatData);
    const spanEnd = generateHeatmapSpan(lastDate, formatData);

    return {
      spanStart,
      spanEnd,
    };
  }
  const heatMapData = [
    heatmapSpan(year, formatData).spanStart,
    ...formatData,
    heatmapSpan(year, formatData).spanEnd,
  ];

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
