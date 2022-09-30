import TemplateCard from "./TemplateCard";
import AddTemplateModal from "./AddTemplateModal";
import auth from "../../utils/auth/auth";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

const buttonStyle = { color: "#BB86FC" };

export function TemplateContainer() {
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);

  //getting users information
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  //function for getting templates
  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  return (
    <div className="ml-5 mr-40 md:ml-52 my-20">
      <div className="flex gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Your Templates</h3>
        {auth.isLoggedIn() && (
          <button
            onClick={() => setIsAddTemplateModalOpen(!isAddTemplateModalOpen)}
            type="button"
            className="flex items-center gap-1 text-primary bg-primary_faded bg-opacity-20 focus:outline-none focus:ring-0 font-medium rounded-full px-3 text-center"
          >
            <HiPlus style={buttonStyle} size={24} /> Template
          </button>
        )}
      </div>

      {auth.isLoggedIn() ? (
        data?.getTemplatesForUser.templates.length ? (
          <div className="flex flex-wrap gap-5 mt-10">
            {data?.getTemplatesForUser.templates.map((template, i) => (
              <TemplateCard
                template={template}
                refetch={refetch}
                key={template.templateName}
              />
            ))}
          </div>
        ) : (
          <p className="text-xl font-extralight mt-3">You have no templates</p>
        )
      ) : (
        <div className="flex gap-4 items-center mt-3">
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
      {/* Passing addtemplatemodal state into component */}
      <AddTemplateModal
        isAddTemplateModalOpen={isAddTemplateModalOpen}
        setIsAddTemplateModalOpen={setIsAddTemplateModalOpen}
        userID={userID}
      />
    </div>
  );
}
