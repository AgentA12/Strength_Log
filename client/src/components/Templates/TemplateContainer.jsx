import TemplateCard from "./TemplateCard";
import AddTemplateModal from "./AddTemplateModal";
import auth from "../../utils/auth/auth";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import LoginBtn from "../buttons/LoginBtn";

export default function TemplateContainer() {
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);

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

  if (error) console.log(error.message);

  return (
    <main className="mx-10 my-10">
      <div className="flex justify-center flex-wrap gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Your Templates</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {auth.isLoggedIn() ? (
          loading ? (
            <div className="flex items-center justify-center">
              <Spinner
                size="lg"
                color="purple"
                aria-label="Purple spinner example"
              />
            </div>
          ) : data?.getTemplatesForUser.length ? (
            data?.getTemplatesForUser.map((template) => (
              <TemplateCard
                template={template}
                refetch={refetch}
                key={template._id}
              />
            ))
          ) : (
            <div className="flex items-center justify-center mt-10">
              You have no templates
            </div>
          )
        ) : (
          <div className="flex gap-4 justify-center items-center">
            <p className=" text-xl font-extralight">
              Log in to see your templates
            </p>
            <Link to={"/Login"}>
              <LoginBtn />
            </Link>
          </div>
        )}
      </div>

      <AddTemplateModal
        isAddTemplateModalOpen={isAddTemplateModalOpen}
        setIsAddTemplateModalOpen={setIsAddTemplateModalOpen}
        userID={userID}
        refetch={refetch}
      />
    </main>
  );
}

{
  /*is user logged in? 
          if true 
         is query loading?
          if true 
         return loading spinner
          if false
         templates have length?
          if true 
         show templates 
          if false 
         show no templates message

         //make a function for this operation
      */
}
