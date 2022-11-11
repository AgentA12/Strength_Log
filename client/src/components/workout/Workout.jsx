import { Button } from "flowbite-react";
import { useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Counter from "../miscellaneous/Counter";
import FinishedModel from "./FinishedModel";
import { motion } from "framer-motion";
//import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Workout() {
  const time = new Date();

  time.setSeconds(time.getSeconds() + 100);

  const { state } = useLocation();

  const [checked, setChecked] = useState();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", delay: 0.1 }}
        exit={{ opacity: 0 }}
        className={
          "pt-5 modal-scroll bg-overlay text-white flex items-center justify-center  w-full h-screen overflow-y-scroll absolute top-0 right-0"
        }
      >
        {/* <div className="cursor-pointer">
          <IoReturnUpBackOutline size={40} color={"#BB86FC"} />
        </div> */}

        <div className="p-5 my-5">
          <div className="flex gap-20 sm:gap-80 items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">
              {state.template.templateName}
            </h1>

            <Button
              gradientMonochrome="success"
              onClick={() => setIsOpen(!isOpen)}
            >
              Finish
            </Button>
          </div>

          <Counter />

          <div className="">
            {state.template.exercises.map((exercise, i) => (
              <div className="mb-5" key={exercise._id}>
                <p className="text-primary font-semibold text-2xl">
                  {capitalizeFirstLetter(exercise.exerciseName)}
                </p>

                <ul className="flex justify-between items-center px-2">
                  <li className="">Set</li>
                  <li className="">Lbs</li>
                  <li className="">Reps</li>
                  <li className="p-2">
                    <BsCheck2All />
                  </li>
                </ul>
                {Array.from(Array(parseInt(exercise.sets)), (element, i) => (
                  <ul
                    key={i}
                    className={`flex justify-between items-center mt-2 py-1 px-2 ${
                      checked && "rounded-lg bg-opacity-20 bg-green-400"
                    }`}
                  >
                    <li
                      className={`px-2 rounded-md bg-inherit${
                        !checked
                          ? " bg-overlay_two "
                          : "bg-opacity-20 bg-green-400"
                      } `}
                    >
                      {i + 1}
                    </li>
                    <li
                      className={`px-2 rounded-md ${
                        !checked ? " bg-overlay_two " : " bg-green-400"
                      } `}
                    >
                      <input
                        className={`px-2 w-12 text-center outline-none border-none focus:border-none focus:outline-none ${
                          !checked ? " bg-overlay_two " : "bg-green-400"
                        } `}
                        type="text"
                        value={exercise.weight}
                      />
                    </li>
                    <li>
                      <input
                        className={`px-2 w-10 text-center outline-none border-none focus:border-none focus:outline-none rounded-md ${
                          !checked ? " bg-overlay_two " : "bg-green-400"
                        }`}
                        type="text"
                        value={exercise.reps}
                      />
                    </li>
                    <li>
                      <button
                        className={`p-2 rounded-md hover:bg-green-400 ${
                          !checked ? " bg-overlay_two " : "bg-green-400"
                        } `}
                        onClick={() => setChecked(!checked)}
                      >
                        <BsCheck2All />
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
            ))}
          </div>
          <div className=" flex justify-center">
            <Link to="/Templates">
              <Button gradientMonochrome="failure">Cancel Workout</Button>
            </Link>
          </div>
        </div>
      </motion.div>
      <FinishedModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
