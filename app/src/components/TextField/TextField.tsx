import styles from "./TextField.module.css";

type Props = {
  label: string;
  name?: string;
  required?: boolean;
  id: string;
  phaceholder?: string;
  value?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  type?: "text" | "number" | "date" | "password" | "datetime-local";
  error?: string;
};

const TextField = ({
  label,
  id,
  value,
  required,
  onChange,
  onBlur,
  type = "text",
  error,
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
        onBlur={onBlur}
        value={value}
        type={type}
      />
      <p className={styles.error}>{ error && error}</p>
    </div>
  );
};

export default TextField;
