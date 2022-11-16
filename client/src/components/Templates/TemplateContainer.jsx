import TemplateCard from "./TemplateCard";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Spinner } from "flowbite-react";

export default function TemplateContainer() {
  //getting user info
  var {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  function displayQueryState() {
    //is the query loading?
    return loading ? (
      <div className="flex gap-2 items-center justify-center mt-10">
        <Spinner size="lg" color="purple" aria-label="Purple spinner example" />
      </div>
    ) : //does the array of templates have length?
    data?.getTemplatesForUser.length ? (
      data?.getTemplatesForUser.map((template) => (
        <TemplateCard
          template={template}
          refetch={refetch}
          key={template._id}
        />
      ))
    ) : (
      //if the array does not contain templates
      <p className="text-center mt-5">You have no templates saved</p>
    );
  }

  return (
    <main className="mx-10 my-10">
      <div className="text-center">
        <h2 className="text-primary font-extrabold text-3xl sm:text-5xl">
          Your Templates
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {displayQueryState()}
      </div>

      {error ? (
        <p className="text-error text-xl text-center">{error.message}</p>
      ) : null}
    </main>
  );
}
