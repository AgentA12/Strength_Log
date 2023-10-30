import { DatePicker } from "@mantine/dates";
import { compareDatesByDay } from "../../utils/helpers/functions";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CALENDAR_TIMESTAMPS } from "../../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Text, LoadingOverlay, Overlay, Box } from "@mantine/core";

export default function Calendar() {
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

  function handleDateClick(date) {
    const dateSelected = calendarTimeStamps.filter((d) =>
      compareDatesByDay(date, new Date(parseInt(d.createdAt)))
    );

    if (dateSelected.length > 0) {
      navigate("/Progress", {
        state: {
          viewCurrentTemplate: dateSelected,
          activeSectionParam: "Date",
        },
      });
    }
  }

  const datePickerDefaultProps = {
    type: "multiple",
    weekendDays: [],
    size: "md",
  };

  if (loading)
    return (
      <Box pos="relative" w={301} h={343.797}>
        <LoadingOverlay visible={true} />
        <DatePicker {...datePickerDefaultProps} />
      </Box>
    );

  if (error)
    return (
      <Box pos="relative" w={301} h={343.797}>
        <Overlay p={5} center={true}>
          <Text ta="center" color="red">
            {error.message}
          </Text>
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
