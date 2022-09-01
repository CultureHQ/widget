const locales = {
  en_US: {
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    monthAbbrs: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
};

const padLeft = value => `0${value}`.slice(-2);

const strftime = (timestamp, format) => {
  const date = new Date(timestamp);

  const segments = format.split(/(%\w)/).map(segment => {
    switch (segment) {
      case "%b":
        return locales.en_US.monthAbbrs[date.getMonth()];
      case "%d":
        return padLeft(date.getDate());
      case "%e":
        return date.getDate();
      case "%l":
        return date.getHours() % 12 || 12;
      case "%m":
        return padLeft(date.getMonth() + 1);
      case "%p":
        return date.getHours() < 12 ? "AM" : "PM";
      case "%y":
        return date.getFullYear() % 100;
      case "%A":
        return locales.en_US.dayNames[date.getDay()];
      case "%B":
        return locales.en_US.monthNames[date.getMonth()];
      case "%H":
        return date.getHours();
      case "%M":
        return padLeft(date.getMinutes());
      case "%Y":
        return date.getFullYear();
      default:
        return segment;
    }
  });

  return segments.join("");
};

export default strftime;
