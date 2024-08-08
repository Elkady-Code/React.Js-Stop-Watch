import { useState, useEffect, useRef } from "react";
import "./index.css";

function StopWatch() {
  const [start, setStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (start) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [start]);

  function handleStartTimer() {
    setStart(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function handleResetTimer() {
    setElapsedTime(0);
    setStart(false);
  }

  function handleStopTimer() {
    setStart(false);
  }

  function handleFormatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <>
      <div className="container">
        <div className="display">{handleFormatTime()}</div>
        <div className="control">
          <button className="start-button" onClick={handleStartTimer}>
            Start
          </button>
          <button className="reset-button" onClick={handleResetTimer}>
            Reset
          </button>
          <button className="stop-button" onClick={handleStopTimer}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
}
export default StopWatch;
