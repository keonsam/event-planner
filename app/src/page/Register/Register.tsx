import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { User } from "../../types/User";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css";
import { registerSchema } from "../../types/schema";
import { AxiosError } from "axios";

type FieldName = "firstName" | "lastName" | "username" | "password";

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

type RegisterError = Partial<
  RegisterData & {
    formError: string;
  }
>;

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState<RegisterError>({});

  const handleChange = (fieldName: FieldName, value: string) => {
    const message =
      registerSchema[fieldName].validate(register[fieldName]).error?.details[0]
        .message || "";

    setRegister({
      ...register,
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
      await axiosClient.post<User>("/register", register);
      navigate("/login");
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
    !!register.firstName &&
    !!register.lastName &&
    !!register.username &&
    !!register.password &&
    !error.firstName &&
    !error.lastName &&
    !error.username &&
    !error.password;

  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <div className={styles.nameField}>
        <TextField
          label="First Name"
          id="firstName"
          value={register.firstName}
          onChange={(value) => handleChange("firstName", value)}
          error={error.firstName}
        />

        <TextField
          label="Last Name"
          id="lastName"
          value={register.lastName}
          onChange={(value) => handleChange("lastName", value)}
          error={error.lastName}
        />
      </div>

      <TextField
        label="Username"
        id="username"
        value={register.username}
        onChange={(value) => handleChange("username", value)}
        error={error.username}
      />

      <TextField
        label="Password"
        id="password"
        value={register.password}
        type="password"
        onChange={(value) => handleChange("password", value)}
        error={error.password}
      />

      <p className={styles.formError}>{error.formError && error.formError}</p>

      <div className={styles.buttonContainer}>
        <Button label="Sign up" type="submit" primary disabled={!isValid} />
        <Button
          label="Already have an Account"
          onClick={() => navigate("/login")}
        />
      </div>
    </form>
  );
};

export default Register;
