import { useRef } from "react";

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const focusCountRef = useRef(0);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusCountRef.current! += 1;
      console.log(`Переходов фокуса: ${focusCountRef.current}`);
    }
  };

  return (
    <div>
      <h3>Focus Tracker</h3>

      <input ref={firstInputRef} onFocus={handleFocus} />
      <input ref={secondInputRef} onFocus={handleFocus} />
      <button onClick={() => firstInputRef.current?.focus()}>
        Сфокусировать на первом
      </button>
    </div>
  );
};
