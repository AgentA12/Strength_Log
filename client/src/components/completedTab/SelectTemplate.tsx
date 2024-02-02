import { Select, Text } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { useUserInfo } from "../../contexts/userInfo";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { TemplateShape } from "../../types/template";

interface Props {
  filterFunction: (arg: string) => void;
}

export default function SelectTemplate({ filterFunction }: Props) {
  const userInfo = useUserInfo();
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

  if (templateError) return <Text>{templateError.message}</Text>;
  if (templateLoading) return <Select disabled />;

  // formatting template data for select template input
  const templateSelectData = templates.getTemplates.map(
    (temp: TemplateShape) => {
      return { label: temp.templateName, value: temp._id };
    }
  );

  return (
    <Select
      defaultValue={"all templates"}
      onChange={(val) => filterFunction(val as string)}
    />
  );
}
