import { TemplateCard } from "./index";
import { TemplateShape } from "../../types/template";
import { showNotification } from "@mantine/notifications";
import { Text, Skeleton } from "@mantine/core";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

interface Props {
  templates: TemplateShape[];
  refetch: () => {};
  loading: boolean;
}
export default function TemplateList({ templates, refetch, loading }: Props) {
  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  async function handleTemplateDelete(
    templateId: string,
    templateName: string
  ) {
    try {
      const res = await deleteTemplate({
        variables: {
          templateId: templateId,
        },
      });

      if (res.data.deleteTemplate.comfirm === true) {
        showNotification({
          title: `Template was deleted.`,
          message: (
            <>
              <Text span size="md">
                {templateName}
              </Text>{" "}
              was successfully deleted.
            </>
          ),
          autoClose: 3000,
        });
      }
      refetch();
    } catch (error: any) {
      showNotification({
        title: "Error, unable to delete template.",
        message: error.message,
        autoClose: 3000,
        color: "red",
      });
    }
  }

  if (loading)
    return (
      <>
        <Skeleton width={"auto"} height={120} />{" "}
        <Skeleton width={"auto"} height={120} />{" "}
        <Skeleton width={"auto"} height={120} />{" "}
        <Skeleton width={"auto"} height={120} />{" "}
        <Skeleton width={"auto"} height={120} />{" "}
      </>
    );

  return templates.length ? (
    templates.map((template: TemplateShape) => (
      <TemplateCard
        template={template}
        handleTemplateDelete={handleTemplateDelete}
        key={template._id}
      />
    ))
  ) : (
    <Text size="xl">You have no templates saved.</Text>
  );
}
