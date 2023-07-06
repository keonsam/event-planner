import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { saveToken } from "../../utils/jwt";
import styles from "./Login.module.css";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

type FieldName = "username" | "password";

type LoginData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleChange = (fieldName: FieldName, value: string) => {
    setLogin({
      ...login,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await axiosClient.post<{ token: string }>(
        "/login",
        login
      );
      saveToken(data.token);
      navigate("/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="username"
        value={login.username}
        onChange={(value) => handleChange("username", value)}
      />

      <TextField
        label="Password"
        id="password"
        value={login.password}
        onChange={(value) => handleChange("password", value)}
        type="password"
      />

      <div className={styles.buttonContainer}>
        <Button label="Sign in" type="submit" primary />
        <Button
          label="Create new Account"
          onClick={() => navigate("/register")}
        />
      </div>
    </form>
  );
};

export default Login;
