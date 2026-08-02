import { useRef } from "react";

interface ClickData {
  startTime: number | null;

  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    if (clickDataRef.current.startTime === null) {
      const nowDate = Date.now();

      clickDataRef.current.startTime = nowDate;
    }
    clickDataRef.current.clickCount++;

    const timeIntervalSec =
      (Date.now() - clickDataRef.current.startTime) / 1000;

    console.log("Количество кликов", clickDataRef.current.clickCount);
    console.log("Разница во времени в секундах", timeIntervalSec);
  };

  return (
    <div>
      <h3>Click Timer</h3>
      <button onClick={handleClick}>Кликни!</button>
    </div>
  );
};
