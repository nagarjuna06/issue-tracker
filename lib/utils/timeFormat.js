import moment from "moment";

export const timeFormat = (time) => {
  return `${timeString} (${fromNow})`;
};

export const dateFormat = (date) => {
  if (date) {
    return moment(date).format("ll");
  }
  return "-";
};
