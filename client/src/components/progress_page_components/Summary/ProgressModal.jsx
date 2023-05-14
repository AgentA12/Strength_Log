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
      size={"lg"}
    >
      <>
        {loading ? (
          <Loader size="md" />
        ) : (
          <>
            <BiTimeFive /> NA
            <FaWeightHanging /> {data?.getSummary[0].totalWeight} lbs
            <AiFillTrophy /> 0 PRs
            {data?.getSummary.map((sumObj, i) => (
              <RenderExercises
                summaryObj={sumObj}
                summaryNum={i}
                key={sumObj._id + Math.random()}
              />
            ))}
          </>
        )}
      </>
    </Modal>
  );
}
