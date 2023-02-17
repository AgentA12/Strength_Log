import TemplateCard from "../components/templates/TemplateCard";
import auth from "../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../utils/graphql/queries";
import { DELETE_TEMPLATE } from "../utils/graphql/mutations";
import { useMutation } from "@apollo/client";
import AddTemplateBtn from "../components/templates/AddTemplateBtn";
import errorImg from "../utils/images/error-img.png";
import SearchTemplate from "../components/templates/SearchTemplates";
import { useEffect, useState } from "react";
import { Title, Text, Tooltip, Divider } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const TemplatePage = () => {
  const [templates, setTemplates] = useState([]);

  const [deleteTemplate] = useMutation(DELETE_TEMPLATE);

  var {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, data, error, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  useEffect(() => {
    if (data) {
      setTemplates(data.getTemplatesForUser);
    }
  }, [data]);

  async function handleTemplateDelete(templateId) {
    try {
      await deleteTemplate({
        variables: {
          templateId: templateId,
        },
      });
      refetch();
    } catch (error) {}
  }

  function handleFilterTemplates(event) {
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
      <Text size={"xl"}>😮 You have no templates.</Text>
    );
  }

  return (
    <main className="mx-5 md:ml-16 max-w-fit">
      <div className="flex flex-wrap gap-5 items-center">
        <div className="flex gap-2 ">
          <Title className="text-2xl sm:text-4xl whitespace-nowrap font-black">
            Your Templates
          </Title>

          <Tooltip
            multiline
            width={220}
            withArrow
            transition="fade"
            transitionDuration={200}
            label="A template is an outline of exercises for a given workout. You can create one by clicking on the add template button"
            position="bottom"
          >
            <p className="m-0">
              <AiOutlineInfoCircle size={23} />
            </p>
          </Tooltip>
        </div>

        <div className="flex items-center justify-start flex-wrap gap-5">
          <SearchTemplate
            templates={templates}
            handleFilterTemplates={handleFilterTemplates}
          />

          <AddTemplateBtn />
        </div>
      </div>

      <Divider my="sm" variant="dashed" />

      {error ? (
        <div className="flex flex-col items-center justify-center gap-1 text-error text-xl mt-20 ml-5">
          <img
            src={errorImg}
            className="h-32"
            alt="error with exclamation mark"
          />

          <p>{error.message}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 mt-6">{displayQueryState()}</div>
      )}
    </main>
  );
};
