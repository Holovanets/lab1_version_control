

const currentWorkTime = (workTime: {
  type: "weekdays" | "weekends" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  start: string;
  end: string;
  nowork?: boolean
}[]) => {
  const now = new Date();
  const today = now.getDay();

  let dayType : "weekdays" | "weekends" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
switch (today) {
    case 0:
        dayType = 'sunday';
        break;
    case 6:
        dayType = 'saturday';
        break;
    default:
        dayType = 'weekdays';
}


  return dayType
}

export default currentWorkTime