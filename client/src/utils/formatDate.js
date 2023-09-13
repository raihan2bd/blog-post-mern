import moment from "moment";

export const formatDate = date => {
  const currentDate = moment();

  let myDate = date;
  const years = currentDate.diff(date, "years");
  const months = currentDate.diff(date, "months");
  const weeks = currentDate.diff(date, "weeks");
  const days = currentDate.diff(date, "days");
  const hours = currentDate.diff(date, "hours");
  const minutes = currentDate.diff(date, "minutes");
  const seconds = currentDate.diff(date, "seconds");

  if (years) {
    const dateInfo = years > 1 ? "years" : "year";
    myDate = years + " " + dateInfo;
    return myDate;
  } else if (months) {
    const dateInfo = months > 1 ? "months" : "month";
    myDate = months + " " + dateInfo;
    return myDate;
  } else if (weeks) {
    const dateInfo = weeks > 1 ? "weeks" : "week";
    myDate = weeks + " " + dateInfo;
    return myDate;
  } else if (days) {
    const dateInfo = days > 1 ? "days" : "day";
    myDate = days + " " + dateInfo;
    return myDate;
  } else if (hours) {
    const dateInfo = hours > 1 ? "hours" : "hour";
    myDate = hours + " " + dateInfo;
    return myDate;
  } else if (minutes) {
    const dateInfo = minutes > 1 ? "minutes" : "minute";
    myDate = minutes + " " + dateInfo;
    return myDate;
  } else {
    const dateInfo = seconds > 1 ? "seconds" : "second";
    myDate = seconds + " " + dateInfo;
    return myDate;
  }

  // const second = Math.abs(currentDate - date) / 1000;
  // const
};
