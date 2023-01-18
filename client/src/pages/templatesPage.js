import TemplateCard from "../components/templates/TemplateCard";
import auth from "../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../utils/graphql/queries";
// import { useState } from "react";
import Spinner from "../components/miscellaneous/Spinner";
// import Pagination from "../components/miscellaneous/Pagination";
import { DELETE_TEMPLATE } from "../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

import AddTemplateBtn from "../components/buttons/AddTemplateBtn";
import errorImg from "../utils/images/error-img.png";
import SearchTemplate from "../components/miscellaneous/SearchTemplates";
import { useEffect, useState } from "react";

export const TemplatePage = () => {
  const [templates, setTemplates] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [templatesPerPage] = useState(8);

  // const indexOfLastTemplate = currentPage * templatesPerPage;
  // const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;

  // let data.getTemplateForUser? = data?.getTemplatesForUser.slice(
  //   indexOfFirstTemplate,
  //   indexOfLastTemplate
  // );

  // function paginate(number) {
  //   setCurrentPage(number);
  // }

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
    await deleteTemplate({
      variables: {
        templateId: templateId,
      },
    });

    refetch();
  }

  function displayQueryState() {
    // is the query loading? display spinner
    return loading ? (
      <div className="ml-14 flex gap-2 justify-center mt-10">
        <Spinner />
      </div>
    ) : // does the array of templates have length? display the template cards
    templates.length ? (
      templates.map((template) => (
        <TemplateCard
          template={template}
          refetch={refetch}
          key={template._id}
          handleTemplateDelete={handleTemplateDelete}
        />
      ))
    ) : // //if the array does not contain templates
    // <p className="text-center text-2xl mt-5">
    //   You have no templates &#128550;
    // </p>
    null;
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

  return (
    <main className="mx-3 my-10 ml-56">
      <div className="flex flex-wrap gap-5 items-center">
        <h2 className=" text-primary font-extrabold text-3xl sm:text-5xl">
          Your Templates
        </h2>

        <div className="flex items-center justify-start flex-wrap gap-5">
          <SearchTemplate
            templates={templates}
            handleFilterTemplates={handleFilterTemplates}
          />

          <AddTemplateBtn />
        </div>
      </div>

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
        <>
          {/* <Pagination
            templatesPerPage={templatesPerPage}
            totalTemplates={data?.getTemplatesForUser.length}
            paginate={paginate}
            currentPage={currentPage}
          /> */}

          <div className="flex flex-wrap gap-5 mt-6">{displayQueryState()}</div>
        </>
      )}
    </main>
  );
};
