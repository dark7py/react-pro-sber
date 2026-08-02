import { useEffect, useRef, useState } from "react";

export const DebouncedLogger = () => {
  const [value, setValue] = useState("");
  const timerRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log(value);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h3>Debounced Logger</h3>
      <input type="text" value={value} onChange={handleInputChange} />
    </div>
  );
};
