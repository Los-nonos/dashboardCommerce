import moment from "moment";

export const isoStringToDateObjectWithoutOffset = date => {
  return moment(date, "YYYY-MM-DD").toDate();
};
