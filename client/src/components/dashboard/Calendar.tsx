import "@mantine/dates/styles.css";
import { DatePicker } from "@mantine/dates";
import { compareDatesByDay } from "../../utils/helpers/functions";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CALENDAR_TIMESTAMPS } from "../../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../../contexts/userInfo";
import { Text, LoadingOverlay, Overlay, Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function Calendar() {
  const { width } = useViewportSize();

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const {
    data: { calendarTimeStamps } = [],
    loading,
    error,
  } = useQuery(CALENDAR_TIMESTAMPS, {
    variables: {
      userId: userID,
    },
  });

  const navigate = useNavigate();

  function handleDateClick(date: Date) {
    const dateSelected = calendarTimeStamps.filter((d) =>
      compareDatesByDay(date, new Date(parseInt(d.createdAt)))
    );
    if (dateSelected.length > 0) {
      const workoutID = dateSelected[0]._id;

      navigate(`/compare`, { state: { workoutID: workoutID } });
    }
  }

  const datePickerDefaultProps = {
    type: "multiple",
    weekendDays: [],
    size: width <= 1300 ? (width < 400 ? "xs" : "sm") : "md",
  };

  if (loading)
    return (
      <Box style={{ borderRadius: "50px" }} pos="relative">
        <LoadingOverlay visible={true} />
        <DatePicker {...datePickerDefaultProps} />
      </Box>
    );

  if (error)
    return (
      <Box pos="relative">
        <Overlay p={5} center={true}>
          <Text ta="center">{error.message}</Text>
        </Overlay>

        <DatePicker {...datePickerDefaultProps} />
      </Box>
    );

  return (
    <DatePicker
      {...datePickerDefaultProps}
      value={calendarTimeStamps.map(
        (date) => new Date(parseInt(date.createdAt))
      )}
      getDayProps={(date) => ({
        onClick: () => handleDateClick(date),
      })}
    />
  );
}
