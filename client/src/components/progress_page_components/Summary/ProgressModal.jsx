import { Modal } from "@mantine/core";
import { BiTimeFive } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import RenderExercises from "./RenderExercises";
import { Loader } from "@mantine/core";

export default function ProgressModal({ isOpen, setIsOpen, loading, data }) {
  return (
    <Modal
      lockScroll={false}
      transition={"rotate-left"}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={isOpen}
      title={data?.getSummary[0].dateCompleted.toUpperCase()}
      onClose={() => setIsOpen(false)}
      className="mx-5 font-black"
      size={"lg"}
    >
      <div className="pb-10 px-10 flex items-center justify-center">
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <Loader variant="bars" />
          </div>
        ) : (
          <div>
            <div className="flex gap-10 my-3">
              <span className="flex gap-1 items-center">
                <BiTimeFive /> NA
              </span>
              <span className="flex gap-1 items-center">
                <FaWeightHanging /> {data?.getSummary[0].totalWeight} lbs
              </span>
              <span className="flex gap-1 items-center">
                <AiFillTrophy /> 0 PRs
              </span>
            </div>

            <div className="flex items-center  justify-center gap-5">
              {data?.getSummary.map((sumObj, i) => (
                <RenderExercises
                  summaryObj={sumObj}
                  summaryNum={i}
                  key={sumObj._id + Math.random()}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
