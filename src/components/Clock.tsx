import { useState } from "react";

const Clock = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  // Helper function to pad numbers with leading zeros
  const padNums = (num: number): string => num.toString().padStart(2, "0");

  // Increment hours, wrap around using modulus
  function handleHoursUpButtonClick() {
    setHours((prev) => (prev + 1) % 24);
  }

  // Decrement hours, wrap around manually
  function handleHoursDownButtonClick() {
    setHours((prev) => (prev === 0 ? 23 : prev - 1));
  }

  // Increment minutes and handle wrapping, also increment hours if necessary
  function handleMinutesUpButtonClick() {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 59) {
        // setHours((prevHours) => (prevHours + 1) % 24);
        return 0;
      }
      return prevMinutes + 1;
    });
  }

  // Decrement minutes and handle wrapping, also decrement hours if necessary
  function handleMinutesDownButtonClick() {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 0) {
        // setHours((prevHours) => (prevHours === 0 ? 23 : prevHours - 1));
        return 59;
      }
      return prevMinutes - 1;
    });
  }

  return (
    <div id="ClockUpdater" className="container">
      <div className="row">
        <button
          id="hours-up-button"
          onClick={handleHoursUpButtonClick}
          className="btn btn-outline-primary col"
        >
          ↑
        </button>

        <button
          id="minutes-up-button"
          className="btn btn-outline-primary col"
          onClick={handleMinutesUpButtonClick}
        >
          ↑
        </button>
      </div>

      <div className="row">
        <div id="clock" className="badge badge-primary col">
          {`${padNums(hours)}:${padNums(minutes)}`}
        </div>
      </div>

      <div className="row">
        <button
          id="hours-down-button"
          onClick={handleHoursDownButtonClick}
          className="btn btn-outline-primary col"
        >
          ↓
        </button>

        <button
          id="minutes-down-button"
          className="btn btn-outline-primary col"
          onClick={handleMinutesDownButtonClick}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default Clock;
