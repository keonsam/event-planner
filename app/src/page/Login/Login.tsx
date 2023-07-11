import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { saveToken } from "../../utils/jwt";
import styles from "./Login.module.css";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { loginSchema } from "../../types/schema";
import { AxiosError } from "axios";

type FieldName = "username" | "password";

type LoginData = {
  username: string;
  password: string;
};

type LoginError = Partial<
  LoginData & {
    formError: string;
  }
>;

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<LoginError>({});

  const handleChange = (fieldName: FieldName, value: string) => {
    const message =
      loginSchema[fieldName].validate(login[fieldName]).error?.details[0]
        .message || "";

    setLogin({
      ...login,
      [fieldName]: value,
    });

    setError({
      ...error,
      [fieldName]: message,
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
    } catch (err) {
      if (err instanceof AxiosError) {
        setError({
          ...error,
          formError: err.message,
        });
      }
    }
  };

  const isValid =
    !!login.username && !!login.password && !error.username && !error.password;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="username"
        value={login.username}
        onChange={(value) => handleChange("username", value)}
        error={error.username}
      />

      <TextField
        label="Password"
        id="password"
        value={login.password}
        onChange={(value) => handleChange("password", value)}
        type="password"
        error={error.password}
      />

      <p className={styles.formError}>{error.formError && error.formError}</p>

      <div className={styles.buttonContainer}>
        <Button label="Sign in" type="submit" primary disabled={!isValid} />
        <Button
          label="Create new Account"
          onClick={() => navigate("/register")}
        />
      </div>
    </form>
  );
};

export default Login;
