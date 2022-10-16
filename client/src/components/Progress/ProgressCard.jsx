import { Card } from "flowbite-react";
function ProgressCard({ card }) {
  return (
    <Card href="#" style={{ backgroundColor: "#292929" }}>
      <h5 className="text-2xl font-bold tracking-tight text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal  text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </Card>
  );
}

export default ProgressCard;
