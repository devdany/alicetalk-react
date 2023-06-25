export const dateFormatter = (date: Date) => {
  const morningOrAfternoon = date.getHours() < 12 ? '오전' : '오후';
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  return `${morningOrAfternoon} ${hours}:${minutes}`;
}