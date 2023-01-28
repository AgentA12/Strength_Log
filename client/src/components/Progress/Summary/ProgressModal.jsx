import { Modal } from "@mantine/core";
import { BiTimeFive } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import RenderExercises from "./RenderExercises";
import { Loader } from "@mantine/core";

export default function ProgressModal({
  isOpen,
  setIsOpen,
  loading,
  error,
  data,
}) {
  return (
    <Modal
      lockScroll={false}
      transition={"rotate-left"}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      size="55%"
    >
      <div className="pb-10 flex items-center justify-center">
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <Loader variant="bars" color={"grape"} />
          </div>
        ) : (
          <div>
            <p>{data?.getSummary[0].dateCompleted.toUpperCase()}</p>
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
