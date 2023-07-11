import styles from "./TextArea.module.css";

type Props = {
  label: string;
  name?: string;
  required?: boolean;
  id: string;
  phaceholder?: string;
  value?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  error?: string;
};

const TextArea = ({
  label,
  id,
  value,
  required,
  onChange,
  onBlur,
  error,
}: Props) => {
  return (
    <div className={styles.textarea}>
      <label className={styles.label} htmlFor="description">
        {label}
      </label>
      <textarea
        id={id}
        className={styles.input}
        onChange={({ target }) => onChange(target.value)}
        onBlur={onBlur}
        value={value}
        required={required}
      />
      <p className={styles.error}>{error && error}</p>
    </div>
  );
};

export default TextArea;
