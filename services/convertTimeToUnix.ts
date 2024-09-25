function convertTimeToUnix(timeString: string)  {
  const [hours, minutes] = timeString.split(':').map(Number); // Разбиваем строку и конвертируем в числа
  const now = new Date(); // Текущая дата
  now.setHours(hours); // Устанавливаем часы
  now.setMinutes(minutes); // Устанавливаем минуты
  now.setSeconds(0); // Секунды на 0, чтобы установить точное время
  now.setMilliseconds(0); // Миллисекунды на 0 для точности
  return now.getTime()
}

export default convertTimeToUnix;
