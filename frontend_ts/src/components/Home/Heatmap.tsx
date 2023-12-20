import ActivityCalendar from 'react-activity-calendar';
import { Tooltip as MuiTooltip } from '@mui/material';

function Heatmap() {
  return (
    <></>
    // <ActivityCalendar
    //   data={[
    //     {
    //       count: 1,
    //       date: '2023-01-01',
    //       level: 4,
    //     },
    //     {
    //       count: 16,
    //       date: '2023-06-22',
    //       level: 4,
    //     },
    //     {
    //       count: 1,
    //       date: '2023-07-05',
    //       level: 4,
    //     },
    //     {
    //       count: 1,
    //       date: '2023-07-17',
    //       level: 4,
    //     },
    //     {
    //       count: 1,
    //       date: '2023-12-31',
    //       level: 4,
    //     },
    //   ]}
    //   blockSize={14}
    //   blockMargin={5}
    //   theme={{
    //     light: ['#474747', '#F25B3B'],
    //     dark: ['#C3C0BF', '#F25B3B'],
    //   }}
    //   renderBlock={(block, activity) => (
    //     <MuiTooltip title={`${activity.count} workout on ${activity.date}`}>
    //       {block}
    //     </MuiTooltip>
    //   )}
    //   hideTotalCount
    //   hideColorLegend
    //   showWeekdayLabels
    // />
  );
}

export default Heatmap;
