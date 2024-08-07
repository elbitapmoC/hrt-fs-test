import { useState } from "react";

const Slider = () => {
  const [boxes, setBoxes] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleLeftShift = () => {
    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes]; // Create a copy of the array
      const firstItem = newBoxes.shift() as number;
      return [...newBoxes, firstItem];
    });
  };

  const handleRightShift = () => {
    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes]; // Create a copy of the array
      const lastItem = newBoxes.pop() as number;
      return [lastItem, ...newBoxes];
    });
  };

  return (
    <nav>
      <button
        type="button"
        className="left-shift-button"
        onClick={handleLeftShift}
      >
        &lt;&lt;
      </button>
      <aside className="boxes">
        {boxes.map((box, index) => (
          <div key={index} className="box">
            {box}
          </div>
        ))}
      </aside>
      <button
        type="button"
        className="right-shift-button"
        onClick={handleRightShift}
      >
        &gt;&gt;
      </button>
    </nav>
  );
};

export default Slider;
