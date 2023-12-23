import { useLocation } from "react-router-dom";
import { WorkoutSection } from "../components/progresspage/index";

export default function SingleWorkout() {
  const {
    state: { workout },
  } = useLocation();

  return <WorkoutSection workout={workout} />;
}
