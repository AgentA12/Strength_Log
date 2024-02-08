import { useState, useRef } from 'react';

const useMS = (initialState = 0) => {
  const [ms, setms] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef<any>(null);

  const handleStart = () => {
    const startTime = Date.now() - ms;
    countRef.current = setInterval(() => {
      setms(Date.now() - startTime);
    }, 10);
    setIsRunning(true);
  }

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
  }

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
    setms(0);
  }

  return { ms, isRunning, handleStart, handlePause, handleReset };
}

export default useMS;