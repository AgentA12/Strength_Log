import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Group, Loader, Select, Text } from "@mantine/core";
import { COMPARE_WORKOUTS } from "../utils/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../contexts/userInfo";
import { TemplateSelect } from "../components/progresspage/index";
import { formatDate } from "../utils/helpers/functions";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES, CALENDAR_TIMESTAMPS } from "../utils/graphql/queries";
import { useLocation } from "react-router-dom";
import { CompareWorkoutsContainer } from "../components/compareworkouts";
import { CompareWorkout } from "../types/compareWorkout";

type CompareTo = "original template" | "previous workout";

export default function CompareWorkoutPage() {
  const [compareTo, setCompareTo] = useState<CompareTo>("original template");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [workoutState, setWorkoutState] = useState<CompareWorkout | null>(null);
  const [dateToCompare, setDateToCompare] = useState<null | string>(null);

  const userInfo = useContext(UserContext);

  const { state } = useLocation();

  const userID = userInfo?.data._id;

  const {
    data: templates,
    loading: templateLoading,
    error: templateError,
  } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [fetchWorkouts] = useLazyQuery(COMPARE_WORKOUTS, {
    variables: {
      userID: userID,
    },
  });

  const { data: cData } = useQuery(CALENDAR_TIMESTAMPS, {
    variables: {
      userId: userID,
      templateName: activeTemplate ? activeTemplate : "hello",
    },
  });

  useEffect(() => {
    if (state?.compareDate) {
      fetchWorkouts({
        variables: {
          userID: userID,
          workoutID: state.compareDate,
        },
      })
        .then(({ data }) => {
          setWorkoutState(data.compareWorkouts);
          setActiveTemplate(
            data.compareWorkouts.formerWorkout.template.templateName.toString()
          );
          setDateToCompare(data.compareWorkouts.formerWorkout._id);
        })
        .catch((error: Error) => {
          //handle error
          console.error(error.message);
        });
    }
  }, [state]);

  if (templateError)
    return (
      <Text c="red.6" fw={600}>
        {templateError.message}
      </Text>
    );

  if (templateLoading) return <Loader />;

  async function handleFetchWorkout(value: string | null) {
    setCompareTo("original template");
    setDateToCompare(value);
    try {
      const { data } = await fetchWorkouts({ variables: { workoutID: value } });
      if (data) {
        setWorkoutState(data.compareWorkouts);
      }
    } catch (error) {}
  }

  function handleTemplateSelect(value: string) {
    setActiveTemplate(value);
    setWorkoutState(null);
    setDateToCompare(null);
  }

  return (
    <>
      <Group>
        {templates ? (
          <TemplateSelect
            label="Select a template"
            templates={templates.getTemplates}
            activeTemplate={activeTemplate}
            setActiveTemplate={(value) => handleTemplateSelect(value as string)}
          />
        ) : (
          <Loader />
        )}

        {activeTemplate ? (
          <Select
            allowDeselect={false}
            w={"fit-content"}
            data={cData?.calendarTimeStamps.map(
              (stamp: { _id: string; createdAt: string }) => {
                return {
                  label: formatDate(parseInt(stamp.createdAt)),
                  value: stamp._id,
                };
              }
            )}
            value={dateToCompare}
            onChange={handleFetchWorkout}
            label="Date to compare"
          />
        ) : (
          <Select
            allowDeselect={false}
            w={"fit-content"}
            disabled
            label={
              <Text size="sm" c="dimmed">
                Date to compare
              </Text>
            }
          />
        )}
      </Group>
      {workoutState ? (
        <CompareWorkoutsContainer
          workoutState={workoutState}
          compareTo={compareTo}
          setCompareTo={setCompareTo}
        />
      ) : null}
    </>
  );
}
