export default function convertHourToMinutes(time: string) {
  // 8:00
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinute = (hour * 60) + minutes;

  return timeInMinute;
}
