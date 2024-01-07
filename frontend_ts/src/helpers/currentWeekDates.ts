function getDatesForOngoingWeek() {
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilMonday = (currentDay + 7 - 1) % 7;

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysUntilMonday + 1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

  return { startDate: formattedStartDate, endDate: formattedEndDate };
}

export default getDatesForOngoingWeek;
