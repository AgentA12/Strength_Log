import { Modal } from "@mantine/core";
import { BiTimeFive } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";

export default function ProgressModal(args) {
  
  return (
    <Modal
    lockScroll={false}
    transition={'rotate-left'}
    overlayOpacity={0.55}
    overlayBlur={3}
      opened={args?.isOpen}
      onClose={() => args.setIsOpen(false)}
      title={args.templateModalData.templateName}
      size="55%"
    >
      <div className="px-12">
        <div className="flex justify-between mb-5">
          <span className="flex gap-1 items-center">
            <BiTimeFive /> Na
          </span>
          <span className="flex gap-1 items-center">
            <FaWeightHanging /> {args.templateModalData.totalWeight} lb
          </span>
          <span className="flex gap-1 items-center">
            <AiFillTrophy /> 0 PRs
          </span>
        </div>

        {args?.templateModalData?.exercises?.map((exercise) => [
          ...new Array(parseInt(exercise.sets))?.map((set) => exercise.name),
        ])}
      </div>
    </Modal>
  );
}
