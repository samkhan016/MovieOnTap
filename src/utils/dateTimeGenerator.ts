export const generateRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12) + 1;
  const randomMinute = Math.floor(Math.random() * 60);

  const formattedMinute = randomMinute < 10 ? `0${randomMinute}` : randomMinute;

  return `${randomHour}:${formattedMinute}`;
};

export const generateDates = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + i);
    const dateLabel = newDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
    dates.push({id: i, label: dateLabel, fullDate: newDate});
  }
  return dates;
};

export const formatDate = (date: string) => {
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  return new Date(date).toLocaleDateString('en-US', options);
};
