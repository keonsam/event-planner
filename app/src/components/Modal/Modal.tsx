import { ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
