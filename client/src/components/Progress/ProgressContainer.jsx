import auth from "../../utils/auth/auth";
import Progress from "./Progress";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Workout from "../Templates/Workout";

export default function ProgressContainer() {
  const { state } = useLocation();

  if (state) {
    return <Workout template={state.template} />;
  }

  const data = [];
  return (
    <div className="ml-5 mr-40 md:ml-52 my-20">
      <div className="flex flex-wrap gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Progress</h3>
      </div>
      {auth.isLoggedIn() ? (
        data?.getProgresssForUser?.templates.length ? (
          <div className="flex flex-wrap gap-5 mt-10">
            {data?.getProgresssForUser.templates.map((template, i) => (
              <Progress key={template.templateName}/>
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
      )}{" "}
    </div>
  );
}
