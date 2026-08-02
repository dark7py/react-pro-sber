/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from "react";

export const PreviousInput = () => {
  const [value, setValue] = useState("");
  const previousInputRef = useRef("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    previousInputRef.current = value;
  }, [value]);

  return (
    <div>
      <h3>Previous Input</h3>
      <input type="text" onChange={handleChangeInput} value={value} />
      <p>Предыдущее значение: {previousInputRef.current}</p>
    </div>
  );
};
