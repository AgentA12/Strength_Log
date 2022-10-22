import Progress from "./Progress";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Workout from "../Templates/Workout";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATES } from "../../utils/graphql/queries";
import ProgressCard from "./ProgressCard";
import auth from "../../utils/auth/auth";

const cards = [
  {
    date: "Monday, October 25",
    totalWeight: 3055,
    time: "50 min",
  },
  {
    date: "Tuesday, October 26",
    totalWeight: 2250,
    time: "2 hours, 30 min",
  },
  {
    date: "Thursday, October 28",
    totalWeight: 3555,
    time: "25 min",
  },
  {
    date: "Friday, October 29",
    totalWeight: 3055,
  },
];

export default function ProgressContainer() {
  const { state } = useLocation();

  //getting users information
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

  if(data)console.log(data)

  if (state) {
    return <Workout template={state.template} />;
  }

  return (
    <>
      <div
        className={`${
          data?.getTemplatesForUser.length &&
          "border-primary border-b"
        } mr-40 md:ml-52 mt-10  pb-10 w-fit pr-20`}
      >
        <div className="flex flex-nowrap gap-5">
          <h2 className="text-primary font-extrabold text-5xl">Progress</h2>
        </div>
        {auth.isLoggedIn() ? (
          data?.getTemplatesForUser.length ? (
            <div className="flex flex-nowrap gap-5 mt-10">
              {data?.getTemplatesForUser.map((template) => (
                <Progress key={template._id} template={template} />
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

      {auth.isLoggedIn() ? (
        <div className=" mr-40 md:ml-52 my-5 pb-10 w-fit pr-20">
          <h5 className="text-white font-extrabold text-3xl mb-2">
            Upper Body Monday
          </h5>
          <p className="text-white_faded font-bold mb-1">History</p>
          <div className=" flex flex-col gap-5 py-10 px-3 h-custom overflow-y-scroll modal-scroll">
            {cards.map((card) => (
              <ProgressCard card={card} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
