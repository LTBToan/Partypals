
const getCalendar = require("./getCalendar");
const putCalendar = require("./putCalendar");
const postCalendar = require("./postCalendar");
const deleteCalendar = require("./deleteCalendar");
module.exports = {
  "/calendar/{userId}": {
    ...getCalendar,
    ...postCalendar,
  },
  "/calendar/{calendarId}": {
    ...putCalendar,
    ...deleteCalendar,
  },
};
