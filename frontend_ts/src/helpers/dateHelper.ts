import { workoutLogsByWeekDto } from '../types/workoutData';

function getDatesForOngoingWeek() {
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilMonday = (currentDay + 7 - 1) % 7;

  const monday = new Date(today);
  monday.setDate(today.getDate() - daysUntilMonday + 1);
  monday.setHours(0, 0, 0, 0);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    daysOfWeek.push(currentDate.toISOString().split('T')[0]);
  }

  return daysOfWeek;
}

function formatDatesToTZ(workoutLogs: workoutLogsByWeekDto) {
  const formatedData = workoutLogs?.map((log) => {
    const date = new Date(log.date).toLocaleDateString();
    const [day, month, year] = date.split('/');
    const convertedDate = new Date(`${year}-${month}-${day}`);
    const formattedDate = convertedDate.toISOString().split('T')[0];
    return { ...log, date: formattedDate };
  });
  return formatedData;
}

export { getDatesForOngoingWeek, formatDatesToTZ };
