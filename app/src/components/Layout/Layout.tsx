import { ReactNode } from "react";
import styles from "./Layout.module.css";
import Header from "../Header/Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
