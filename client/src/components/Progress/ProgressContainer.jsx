import { useState } from "react";
import ProgressCard from "./ProgressCard";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
} from "../../utils/graphql/queries";
import TemplateCard from "./TemplateCard";
import auth from "../../utils/auth/auth";
import LoginBtn from "../buttons/LoginBtn";
import { Spinner } from "flowbite-react";

export default function ProgressContainer() {
  const [activeTemplate, setActiveTemplate] = useState();
  //getting users information
  if (auth.isLoggedIn()) {
    var {
      data: { _id: userID },
    } = auth.getInfo();
  }

  const { loading, error, data } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [loadOneTemplate, res] = useLazyQuery(GET_TEMPLATES_PROGRESS);

  function handleQuery(templateId) {
    loadOneTemplate({
      variables: {
        id: templateId,
      },
    });
  }

  if (error) console.log(error);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div
        className={`${
          data?.getTemplatesForUser.length && "border-primary border-b"
        } mr-40 md:ml-52 mt-10 pb-10 w-fit pr-20`}
      >
        <div className="flex flex-nowrap gap-5">
          <h2 className="text-primary font-extrabold text-5xl">Progress</h2>
        </div>

        {auth.isLoggedIn() ? (
          data?.getTemplatesForUser.length ? (
            <div className="flex flex-wrap gap-5 mt-10">
              {data?.getTemplatesForUser.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  handleQuery={handleQuery}
                  res={res}
                  activeTemplate={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-xl font-extralight mt-3">
              You haven't saved any Workouts
            </p>
          )
        ) : (
          <div className="flex gap-4 items-center mt-3">
            <p className=" text-xl font-extralight">
              Log in to see your Progress
            </p>
            <Link to={"/Login"}>
              <LoginBtn />
            </Link>
          </div>
        )}
      </div>

      {auth.isLoggedIn() ? (
        <div className=" mr-40 md:ml-52 my-5 pb-10 w-fit pr-20">
          <h5 className="text-white font-extrabold text-3xl mb-2">
            Upper Body Monday
          </h5>
          <p className="text-white_faded font-bold mb-1">History</p>
          <div className=" flex flex-col gap-5 py-10 px-3 h-custom overflow-y-scroll modal-scroll">
            {res.data?.getProgress.length ? (
              res.data.getProgress.map((progressInfo) => (
                <ProgressCard
                  progressInfo={progressInfo}
                  key={progressInfo._id}
                />
              ))
            ) : (
              <p className="">You haven't saved workouts</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
