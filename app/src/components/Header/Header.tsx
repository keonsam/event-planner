import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../utils/jwt";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();
  const handleLogOut = () => {
    deleteToken();
    navigate('/login')
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Event Planner</h1>
      <Button label="log out" primary size="small" onClick={handleLogOut} />
    </div>
  );
};

export default Header;
