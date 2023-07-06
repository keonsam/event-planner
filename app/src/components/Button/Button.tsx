import styles from "./Button.module.css";

type Props = {
  label: string;
  primary?: boolean;
  size?: "medium" | "small";
  type?: "submit" | "button";
  onClick?: () => void;
};

export const Button = ({
  label,
  size,
  primary,
  type = "button",
  onClick,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${primary ? styles.primary : ""} ${
        size ? styles[size] : ""
      }`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
