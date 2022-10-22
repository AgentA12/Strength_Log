import TemplateCard from "./TemplateCard";
import AddTemplateModal from "./AddTemplateModal";
import auth from "../../utils/auth/auth";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { Spinner } from "flowbite-react";

const buttonStyle = { color: "#BB86FC" };

export default function TemplateContainer() {
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);

  //getting users information
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
      offset: 0,
      limit: 5,
    },
  });

  if (data) console.log(data);

  if (error) console.log(error);

  function renderAddTemplateButton() {
    return (
      <button
        onClick={() => setIsAddTemplateModalOpen(!isAddTemplateModalOpen)}
        className="group add-template-btn group-hover:from-purple-600 group-hover:to-primary"
      >
        <span className="flex gap-1 items-center bg-background relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <HiPlus style={buttonStyle} size={24} /> Template
        </span>
      </button>
    );
  }

  return (
    <div className="mx-10 my-10">
      <div className="flex justify-center flex-wrap gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Your Templates</h3>
        {auth.isLoggedIn() ? renderAddTemplateButton() : null}
      </div>

      {/*is user logged in? 
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
      */}
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
              <button
                type="button"
                className="w-fit text-primary hover:text-background border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary_faded font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Passing AddTemplateModal state into component */}
      <AddTemplateModal
        isAddTemplateModalOpen={isAddTemplateModalOpen}
        setIsAddTemplateModalOpen={setIsAddTemplateModalOpen}
        userID={userID}
        refetch={refetch}
      />
    </div>
  );
}
