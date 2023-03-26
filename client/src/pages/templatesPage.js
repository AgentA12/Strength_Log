import { useEffect, useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  SearchTemplates,
  TemplateCard,
  AddTemplateBtn,
} from "../components/template_page_components/index";
import { GET_TEMPLATES } from "../utils/graphql/queries";
import { DELETE_TEMPLATE } from "../utils/graphql/mutations";
import { Title, Text, Tooltip, Divider, Skeleton, Flex } from "@mantine/core";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { UserContext } from "../App";
import { showNotification } from "@mantine/notifications";

export const TemplatePage = () => {
  const userInfo = useContext(UserContext);

  const [templates, setTemplates] = useState([]);

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  const { loading, data, error, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userInfo.data._id,
    },
  });

  useEffect(() => {
    if (data) {
      setTemplates(data.getTemplatesForUser);
    }
  }, [data]);

  async function handleTemplateDelete(templateId) {
    try {
      const res = await deleteTemplate({
        variables: {
          templateId: templateId,
        },
      });
      refetch();
      showNotification({
        title: `Template was deleted.`,
        message: (
          <>
            <Text span={true} color="grape" size="xl" weight="bold">
              {res.data.deleteTemplate.templateName}
            </Text>{" "}
            was successfully deleted
          </>
        ),
        autoClose: 3000,
        color: "grape",
      });
    } catch (error) {
      showNotification({
        title: "Error, unable to delete template.",
        message: error.message,
        autoClose: 3000,
        color: "red",
      });
    }
  }

  function filterTemplates(event) {
    event.preventDefault();

    const newTemplates = templates.filter((template) => {
      return template.templateName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    if (newTemplates.length > 0) {
      setTemplates(newTemplates);
    }

    if (event.target.value.trim().length === 0) {
      setTemplates(data.getTemplatesForUser);
    }
  }

  function displayQueryState() {
    // is the query loading?
    return loading ? (
      <>
        <Skeleton height={150} width={384} />
        <Skeleton height={150} width={384} />
        <Skeleton height={150} width={384} />
        <Skeleton height={150} width={384} />
      </>
    ) : // does the array of templates have length? display the template cards
    templates.length ? (
      templates.map((template) => (
        <TemplateCard
          template={template}
          refetch={refetch}
          handleTemplateDelete={handleTemplateDelete}
          key={template._id}
        />
      ))
    ) : (
      <Text size={"xl"}>You have no templates saved.</Text>
    );
  }

  return (
    <main className="mx-5 md:ml-16 max-w-fit">
      <Flex
        gap="lg"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Flex gap={"md"}>
          <Title className="text-2xl sm:text-4xl whitespace-nowrap font-black">
            Your Templates
          </Title>

          <Tooltip
            multiline
            width={220}
            withArrow
            transition="fade"
            transitionDuration={200}
            label="A template is an outline of exercises for a given workout."
            position="bottom"
          >
            <p className="m-0">
              <AiOutlineInfoCircle size={23} />
            </p>
          </Tooltip>
        </Flex>

        <Flex
          gap="lg"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <SearchTemplates
            templates={templates}
            filterTemplates={filterTemplates}
          />
          <AddTemplateBtn />
        </Flex>
      </Flex>

      <Divider my="md" variant="dashed" style={{ width: "90vw" }} />

      {error ? (
        <div className="text-error text-xl mt-20 ml-5">
          <p>{error.message}</p>
        </div>
      ) : (
        <Flex wrap={"wrap"} gap="md" className="mt-6">
          {displayQueryState()}
        </Flex>
      )}
    </main>
  );
};
