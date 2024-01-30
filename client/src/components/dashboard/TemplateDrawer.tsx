import { Text, Flex, Button, Drawer, Select } from "@mantine/core";
import { useContext, useState, useEffect } from "react";
import { SAVE_WORKOUT } from "../../utils/graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import WorkoutState from "./WorkoutState";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { UserContext } from "../../contexts/userInfo";
import { StartWorkoutBtn } from "./index";
import { TemplateShape } from "../../types/template";
import { GET_TEMPLATE_PROGRESS } from "../../utils/graphql/queries";

interface Props {
  template: TemplateShape;
  opened: boolean;
  setOpened: (bool: boolean) => void;
}

type WorkoutData = "original template" | "previously saved";

export default function TemplateDrawer(props: Props) {
  const { template, opened, setOpened } = props;

  const userInfo = useContext(UserContext);

  const userID = userInfo?.data._id;
  const templateID = template._id;

  const [workoutDataType, setWorkoutDataType] =
    useState<WorkoutData>("original template");

  const [saveWorkoutFunction, { loading, error }] = useMutation(SAVE_WORKOUT);
  const { data, loading: tempProgressLoading } = useQuery(
    GET_TEMPLATE_PROGRESS,
    {
      variables: {
        userID: userID,
        templateID: templateID,
      },
    }
  );

  const [templateState, setTemplateState] = useState(template);

  useEffect(() => {
    if (data?.getPreviousWorkout._id) {
      workoutDataType === "previously saved"
        ? setTemplateState(data.getPreviousWorkout)
        : setTemplateState(template);
    }
  }, [workoutDataType]);

  function handleSaveWorkout() {
    // async await is very inconsistent here
    saveWorkoutFunction({
      variables: {
        templateId: template._id,
        userID: userID,
        exercises: [...templateState.exercises],
      },
    })
      .then((res) => {
        if (res.data?.saveWorkout.username && !loading) {
          setOpened(false);
          showNotification({
            title: `${res.data.saveWorkout.username} your template was saved!`,
            message: "Your workout will be recorded. 🥳",
            autoClose: 3000,
            icon: <AiOutlineCheck />,
          });
        }
      })
      .catch((error) => {
        showNotification({
          title: `Oops, there was an error while saving your template`,
          message: error.message,
          autoClose: 3000,
          icon: <BiErrorCircle />,
          color: "red",
        });
      });
  }
  return (
    <Drawer
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Text
          tt="capitalize"
          style={{
            fontSize: 25,
            fontWeight: "bolder",
          }}
        >
          {template.templateName}
        </Text>
      }
    >
      <Select
        size="md"
        mb={12}
        description="Using"
        w={"fit-content"}
        defaultValue="original template"
        data={["original template", "previously saved"]}
        onChange={(val) => setWorkoutDataType(val as WorkoutData)}
        allowDeselect={false}
        disabled={data?.getPreviousWorkout._id ? false : true}
      />

      <Text c="dimmed" size="sm" mb={10}>
        {template.templateNotes.trim()
          ? `- ${template.templateNotes}`
          : `- No notes.`}
      </Text>
      <Flex justify="space-around" align="center">
        <Button onClick={handleSaveWorkout} loading={loading}>
          Quick Save
        </Button>
        <StartWorkoutBtn template={template} />
      </Flex>

      <WorkoutState
        setTemplateState={setTemplateState}
        templateState={templateState}
      />

      {error ? (
        <Text c="red.4" mt={5}>
          {error.message}
        </Text>
      ) : null}
    </Drawer>
  );
}
