import { DatePicker } from "@mantine/dates";
import { compareDatesByDay } from "../../utils/helpers/functions";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import auth from "../../utils/auth/auth";

export default function CalendarComponent() {
  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { data, loading, error } = useQuery(
    gql`
      query ($userId: ID!) {
        getProgressTimeStamps(userId: $userId) {
          dates {
            date
            templateId
          }
        }
      }
    `,
    {
      variables: {
        userId: userID,
      },
    }
  );

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

  if (loading) return "loading calendar";

  if (error) return error;

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
      size={"md"}
      value={data?.getProgressTimeStamps?.dates.map(
        (d) => new Date(parseInt(d.date))
      )}
      getDayProps={(date) => ({
        onClick: () => handleDateClick(date),
      })}
    />
  );
}
