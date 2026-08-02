import {
  ClickTimer,
  PreviousInput,
  FocusTracker,
  DebouncedLogger,
} from "features/refExamples";

export const RefExamples = () => {
  return (
    <div>
      <h2>Примеры с useRef</h2>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
    </div>
  );
};
