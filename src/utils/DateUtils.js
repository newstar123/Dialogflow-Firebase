import moment from "moment";

export const getDateInFormat = (date = moment()) => {
  return date.format("YYYY-MM-DD");
};
