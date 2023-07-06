import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { User } from "../../types/User";

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
      const { data: user } = await axiosClient.post<User>(
        "/register",
        register
      );
      console.log(user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            onChange={({ target }) => handleChange("firstName", target.value)}
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            onChange={({ target }) => handleChange("lastName", target.value)}
          />
        </div>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={({ target }) => handleChange("username", target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={({ target }) => handleChange("password", target.value)}
        />

        <div>
          <button type="submit">Sign Up</button>
        </div>

        <p>
          Already have an account? <Link to="/register"> Login now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
