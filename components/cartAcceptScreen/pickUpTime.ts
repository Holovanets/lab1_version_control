function getDeliveryTimes(openTime : string, closeTime : string) {
  const now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  // Преобразование времени закрытия для учета моментов, когда закрытие наступает после полуночи
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);
  const closingTime = new Date(now);
  if (closeHour < 6) { // Предполагаем, что если час закрытия меньше 6, то это время после полуночи
    closingTime.setDate(now.getDate() + 1);
  }
  closingTime.setHours(closeHour);
  closingTime.setMinutes(closeMinute);

  // Проверяем, не закрыто ли уже заведение
  if (now >= closingTime) {
    console.log("Заведение уже закрыто.");
    return [];
  }

  const times = [];
  // Приведение текущего времени к ближайшему интервалу в 15 минут
  const nextInterval = 45 - (currentMinute % 15);
  const startTime = new Date(now.getTime() + nextInterval * 60000);

  
  // Генерация временных блоков
  for (let time = new Date(startTime); time < closingTime; time.setMinutes(time.getMinutes() + 15)) {
    times.push(time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
  }

  return times;
}

export default getDeliveryTimes