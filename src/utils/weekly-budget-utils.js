export function getWeekdaysOccurences(weekDayIndex) {
  const date = new Date();
  const month = date.getMonth();
  const weekDaysOccurences = [];

  date.setDate(weekDayIndex);

  // Get the first occurrence of the wanted weekday in the current month
  while (date.getDay() !== weekDayIndex) {
    date.setDate(date.getDate() + 1);
  }

  // Get all the others occurences of the wanted weekday
  while (date.getMonth() === month) {
    weekDaysOccurences.push(new Date(date.getTime()));
    date.setDate(date.getDate() + 7);
  }

  return weekDaysOccurences.length;
}
