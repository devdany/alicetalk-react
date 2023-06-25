export const dateFormatter = (date: Date) => {
  const morningOrAfternoon = date.getHours() < 12 ? '오전' : '오후';
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  return `${morningOrAfternoon} ${hours}:${minutes}`;
}

export const isSameDate = (date1: Date, date2: Date) => {
  const year = date1.getFullYear() - date2.getFullYear();
  const month = date1.getMonth() - date2.getMonth();
  const day = date1.getDate() - date2.getDate();
  const hour = date1.getHours() - date2.getHours();
  const minutes = date1.getMinutes() - date2.getMinutes();

  return year === 0 && month === 0 && day === 0 && hour === 0 && minutes === 0;
}