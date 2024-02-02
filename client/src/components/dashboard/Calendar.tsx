import "@mantine/dates/styles.css";
import { DatePicker } from "@mantine/dates";
import { compareDatesByDay } from "../../utils/helpers/functions";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CALENDAR_TIMESTAMPS } from "../../utils/graphql/queries";
import { useUserInfo } from "../../contexts/userInfo";
import { Text, LoadingOverlay, Overlay, Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

interface CalendarTimeStamp {
  createdAt: string;
}

export default function Calendar() {
  const { width } = useViewportSize();

  const userInfo = useUserInfo();

  const userID = userInfo?.data._id;

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
    const dateSelected = calendarTimeStamps.filter(
      (timeStamp: CalendarTimeStamp) =>
        compareDatesByDay(date, new Date(parseInt(timeStamp.createdAt)))
    );
    if (dateSelected.length > 0) {
      const workoutID = dateSelected[0]._id;

      navigate(`/progress`, {
        state: { compareDate: workoutID, activeTab: "compare" },
      });
    }
  }

  if (loading)
    return (
      <Box style={{ borderRadius: "50px" }} pos="relative">
        <LoadingOverlay visible={true} />
        <DatePicker
          type="default"
          weekendDays={[]}
          size={width < 1300 ? (width < 400 ? "xs" : "sm") : "md"}
        />
      </Box>
    );

  if (error)
    return (
      <Box pos="relative">
        <Overlay p={5} center={true}>
          <Text ta="center">{error.message}</Text>
        </Overlay>

        <DatePicker
          type="default"
          weekendDays={[]}
          size={width < 1300 ? (width < 400 ? "xs" : "sm") : "md"}
        />
      </Box>
    );
  return (
    <DatePicker
      type="multiple"
      weekendDays={[]}
      size={width < 1300 ? (width < 400 ? "xs" : "sm") : "md"}
      value={calendarTimeStamps.map(
        (date: CalendarTimeStamp) => new Date(parseInt(date.createdAt))
      )}
      getDayProps={(date) => ({
        onClick: () => handleDateClick(date),
      })}
    />
  );
}
