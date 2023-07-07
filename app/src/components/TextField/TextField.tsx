import styles from "./TextField.module.css";

type Props = {
  label: string;
  name?: string;
  required?: boolean;
  id: string;
  phaceholder?: string;
  value: string | Date;
  onBlur?: () => void;
  onChange: (value: string) => void;
  type?: "text" | "number" | "date" | "password" | "datetime-local";
};

const TextField = ({
  label,
  id,
  value,
  required,
  onChange,
  type = "text",
}: Props) => {
  return (
    <div className={styles.textField}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        required={required}
        onChange={({ target }) => onChange(target.value)}
        value={value}
        type={type}
      />
    </div>
  );
};

export default TextField;
