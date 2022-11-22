import TemplateCard from "./TemplateCard";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { useState } from "react";
import Spinner from "../miscellaneous/Spinner";
import Pagination from "../miscellaneous/Pagination";
import { DELETE_TEMPLATE } from "../../utils/graphql/mutations";
import { useMutation } from "@apollo/client";

export default function TemplateContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [templatesPerPage] = useState(8);
  const [deleteTemplate, { deleteData, deleteError }] =
    useMutation(DELETE_TEMPLATE);
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;

  var {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  let currentTemplates = data?.getTemplatesForUser.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  function paginate(number) {
    setCurrentPage(number);
  }

  async function handleTemplateDelete(templateId) {
    await deleteTemplate({
      variables: {
        templateId: templateId,
      },
    });

    refetch();
  }

  function displayQueryState() {
    // is the query loading?
    return loading ? (
      <div className="flex gap-2 items-center justify-center mt-10">
        <Spinner />
      </div>
    ) : // does the array of templates have length?
    currentTemplates.length ? (
      currentTemplates.map((template) => (
        <TemplateCard
          template={template}
          refetch={refetch}
          key={template._id}
          handleTemplateDelete={handleTemplateDelete}
        />
      ))
    ) : (
      //if the array does not contain templates
      <p className="text-center mt-5">You have no templates saved</p>
    );
  }

  return (
    <main className="mx-10 my-10">
      <h2 className="text-center text-primary font-extrabold text-3xl sm:text-5xl">
        Your Templates
      </h2>

      {error ? (
        <p className="text-error text-xl text-center">{error.message}</p>
      ) : (
        <>
          <Pagination
            templatesPerPage={templatesPerPage}
            totalTemplates={data?.getTemplatesForUser.length}
            paginate={paginate}
            currentPage={currentPage}
          />

          <div className="flex flex-wrap justify-center gap-5 mt-6">
            {displayQueryState()}
          </div>
        </>
      )}
    </main>
  );
}
