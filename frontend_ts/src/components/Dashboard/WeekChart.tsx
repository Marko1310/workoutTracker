import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {
  getDatesForOngoingWeek,
  formatDatesToTZ,
} from '../../helpers/dateHelper';
import { useWorkoutLogsByWeek } from '../../queries/workoutQueries';

type workoutData = {
  date: string;
  count: number;
}[];

function WeekChart() {
  const datesOfCurrentWeek = getDatesForOngoingWeek();
  const { workoutLogsByWeek } = useWorkoutLogsByWeek(
    datesOfCurrentWeek[0],
    datesOfCurrentWeek[6],
  );
  const formatedData = formatDatesToTZ(workoutLogsByWeek);

  function createWorkoutDataset(
    datesOfCurrentWeek: string[],
    workoutData: workoutData,
  ) {
    const dataset = {
      label: 'Current Week Workouts',
      data: Array(datesOfCurrentWeek.length).fill(0),
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    };

    workoutData?.forEach((workout) => {
      const index = datesOfCurrentWeek.indexOf(workout.date);
      if (index !== -1) {
        dataset.data[index] = workout.count;
      }
    });
    return dataset;
  }

  const workoutDataset = createWorkoutDataset(datesOfCurrentWeek, formatedData);

  return (
    <Bar
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: false },
            weight: 0.1,

            ticks: { stepSize: 1 },
          },
          x: {
            beginAtZero: true,
            grid: { display: false },
            weight: 0.1,
          },
        },
      }}
      data={{
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [workoutDataset],
      }}
    />
  );
}

export default WeekChart;
