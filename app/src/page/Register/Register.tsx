import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { User } from "../../types/User";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css";

type FieldName = "firstName" | "lastName" | "username" | "password";

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (fieldName: FieldName, value: string) => {
    setRegister({
      ...register,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axiosClient.post<User>(
        "/register",
        register
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          id="firstName"
          value={register.firstName}
          onChange={(value) => handleChange("firstName", value)}
        />

        <TextField
          label="Last Name"
          id="lastName"
          value={register.lastName}
          onChange={(value) => handleChange("lastName", value)}
        />

      <TextField
        label="Username"
        id="username"
        value={register.username}
        onChange={(value) => handleChange("username", value)}
      />

      <TextField
        label="Password"
        id="password"
        value={register.password}
        type="password"
        onChange={(value) => handleChange("password", value)}
      />

      <div className={styles.buttonContainer}>
        <Button label="Sign up" type="submit" primary />
        <Button
          label="Already have an Account"
          onClick={() => navigate("/login")}
        />
      </div>
    </form>
  );
};

export default Register;
