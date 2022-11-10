import TemplateCard from "./TemplateCard";
import auth from "../../utils/auth/auth";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import LoginBtn from "../buttons/LoginBtn";

export default function TemplateContainer() {
  //getting user info
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  function displayQueryState() {
    //is user logged in?
    return auth.isLoggedIn() ? (
      //is the query loading?
      loading ? (
        <div className="flex gap-2 items-center justify-center mt-10">
          <Spinner
            size="lg"
            color="purple"
            aria-label="Purple spinner example"
          />
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
        //if the array does not have templates
        <p className="text-center mt-5">You have no templates</p>
      )
    ) : (
      //if the user is not logged in
      <div className="flex gap-4 justify-center items-center">
        <p className="text-xl font-extralight">Log in to see your templates</p>
        <Link to={"/Login"}>
          <LoginBtn />
        </Link>
      </div>
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
