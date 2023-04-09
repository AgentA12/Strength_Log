import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { compareDatesByDay } from "../../utils/helpers/functions";

export default function CalendarComponent() {
  const [dates, setDates] = useState([
    new Date(2023, 3, 7),
    new Date(2023, 3, 8),
    new Date(2023, 3, 9),
    new Date(2023, 3, 6),
    new Date(2023, 3, 5),
    new Date(2023, 3, 4),
  ]);

  function handleDateClick(date) {
    const dateSelected = dates.filter((d) => compareDatesByDay(date, d));

    if (dateSelected.length > 0) {
      console.log("summary of workout here");
    } else {
      console.log("create new workout here");
    }
  }

  return (
    <DatePicker
      type="multiple"
      size={"md"}
      value={dates}
      getDayProps={(date) => ({
        onClick: () => handleDateClick(date),
      })}
    />
  );
}
