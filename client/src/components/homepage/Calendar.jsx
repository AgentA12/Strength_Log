import { DatePicker } from "@mantine/dates";
import { compareDatesByDay } from "../../utils/helpers/functions";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CALENDAR_DATA } from "../../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Loader, Center, Text } from "@mantine/core";

export default function Calendar() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_CALENDAR_DATA, {
    variables: {
      userId: userID,
    },
  });

  const navigate = useNavigate();

  function handleDateClick(date) {
    const dateSelected = data?.getProgressTimeStamps.dates.filter((d) =>
      compareDatesByDay(date, new Date(parseInt(d.date)))
    );

    if (dateSelected.length > 0) {
      // route to summary page
      navigate("/Progress");
    }
  }

  if (loading)
    return (
      <Center w={343}>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Center w={343}>
        <Text color="red">{error}</Text>
      </Center>
    );

  return (
    <DatePicker
      styles={(theme) => ({
        day: {
          color:
            theme.colorScheme === "dark"
              ? theme.colors.gray[0]
              : theme.colors.dark[9],
        },
      })}
      type="multiple"
      weekendDays={[]}
      size="lg"
      value={data?.getProgressTimeStamps?.dates.map(
        (d) => new Date(parseInt(d.date))
      )}
      getDayProps={(date) => ({
        onClick: () => handleDateClick(date),
      })}
    />
  );
}
