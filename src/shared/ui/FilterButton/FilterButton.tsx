import styles from "./FilterButton.module.scss";

type FilterButtonProps = {
  text: string;
  isActive?: boolean;
  handleClick: (f: string) => void;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  text,
  isActive = false,
  handleClick,
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={() => handleClick(text)}
    >
      {text}
    </button>
  );
};
