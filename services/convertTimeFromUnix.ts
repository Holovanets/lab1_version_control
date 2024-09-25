function convertTimeFromUnix(unixTime: number){
  const date = new Date(unixTime); // Создание объекта Date из UNIX-времени
  const day = date.getDate().toString().padStart(2, '0'); // День с ведущим нулём
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц с ведущим нулём (getMonth() возвращает месяц от 0 до 11)
  const year = date.getFullYear(); // Год
  const hours = date.getHours().toString().padStart(2, '0'); // Часы с ведущим нулём
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Минуты с ведущим нулём

  return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматирование строки
}
export default convertTimeFromUnix