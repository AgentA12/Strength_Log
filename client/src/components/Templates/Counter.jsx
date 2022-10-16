import { useStopwatch } from "react-timer-hook";

export default function Counter() {
  const { seconds, minutes, hours, days, isRunning,  pause } =
    useStopwatch({
      autoStart: true,
    });

  if (hours >= 95) pause();

  return (
    <div className="text-bold text-white_faded text-lg my-1">
      <span>{hours >= 1 && hours + ":"}</span>
      <span>{minutes}</span>:<span>{seconds < 10 && "0"}{seconds}</span>
    </div>
  );
}

