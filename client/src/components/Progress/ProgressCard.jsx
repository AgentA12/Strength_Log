import { Card } from "flowbite-react";
import { FaWeightHanging } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

export default function ProgressCard({ card }) {
  return (
    <Card style={{ backgroundColor: "#292929" }}>
      <h5 className="text-2xl font-bold tracking-tight text-white">
        {card.date}
      </h5>
      <p className="flex gap-2 font-normal text-gray-400">
        <span className="flex items-center gap-1">
          <FaWeightHanging /> Total Weight: {card.totalWeight} lb
        </span>
        {card.time ? (
          <span className="flex items-center gap-1">
            <BiTime /> {card.time}
          </span>
        ) : null}
      </p>
    </Card>
  );
}
