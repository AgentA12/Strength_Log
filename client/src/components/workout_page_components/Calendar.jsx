import { DatePicker } from "@mantine/dates";
import { useState } from "react";

export default function CalendarComponent(props) {
  const [values] = useState([
    new Date(2023, 2, 7),
    new Date(2023, 2, 8),
    new Date(2023, 2, 10),
    new Date(2023, 2, 11),
  ]);

  function handleDateChange(dates) {
    console.clear();
    // dates is an array of currently selected dates with the date clicked on being the last date in the array
    // when a user clicks on a date
    // if the date is already selected => show saved workout
    // if the date is not selected => show model to save workout
  }

  return (
    <DatePicker
      type="multiple"
      size={"lg"}
      value={values}
      date={new Date()}
      onChange={handleDateChange}
    />
  );
}
