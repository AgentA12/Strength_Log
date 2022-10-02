import auth from "../../utils/auth/auth";
import { HiPlus } from "react-icons/hi";
import Routine from "./Routine";
import {Link} from "react-router-dom"

export default function RoutineContainer() {
  const data = [];
  return (
    <div className="ml-5 mr-40 md:ml-52 my-20">
      <div className="flex flex-wrap gap-5">
        <h3 className="text-primary font-extrabold text-5xl">Progress</h3>
        {/* {auth.isLoggedIn() && (
          <button class=" relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-primary group-hover:from-purple-600 group-hover:to-primary  text-white focus:ring-4 focus:outline-none focus:ring-primary_faded dark:focus:ring-blue-800">
            <span class="flex gap-1  items-center bg-background relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <HiPlus size={24} /> Routine
            </span>
          </button>
        )} */}
      </div>
      {auth.isLoggedIn() ? (
        data?.getRoutinesForUser?.templates.length ? (
          <div className="flex flex-wrap gap-5 mt-10">
            {data?.getRoutinesForUser.templates.map((template, i) => (
              <Routine />
            ))}
          </div>
        ) : (
          <p className="text-xl font-extralight mt-3">
            You haven't saved any templates
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
