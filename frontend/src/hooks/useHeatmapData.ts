import { Activity, Level } from 'react-activity-calendar';
import { workoutLogDto } from '../types/workoutData';

export const useHeatmapData = (
  year: number,
  workoutLogsByYear: workoutLogDto,
) => {
  const formatedWorkoutLogDataForHeatmap = workoutLogsByYear
    ? workoutLogsByYear.map((log) => {
        const dateObject = new Date(log.createDateTime);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return { count: 1, date: formattedDate, level: 4 as Level };
      })
    : [];

  function heatmapSpan(year: number, formatData: Activity[]) {
    const firstDate = `${year}-01-01`;
    const lastDate = `${year}-12-31`;

    const spanStart = {
      count: formatData[0]?.date === firstDate ? 1 : 0,
      date: firstDate,
      level: formatData[0]?.date === firstDate ? 4 : (0 as Level),
    };
    const spanEnd = {
      count: formatData[formatData.length - 1]?.date === lastDate ? 1 : 0,
      date: lastDate,
      level:
        formatData[formatData.length - 1]?.date === lastDate ? 4 : (0 as Level),
    };

    return {
      spanStart,
      spanEnd,
    };
  }
  const heatMapData = [
    heatmapSpan(year, formatedWorkoutLogDataForHeatmap).spanStart,
    ...formatedWorkoutLogDataForHeatmap,
    heatmapSpan(year, formatedWorkoutLogDataForHeatmap).spanEnd,
  ];

  return { heatMapData };
};
