import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { saveToken } from "../../utils/jwt";

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
      saveToken(data.token)
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={({ target }) => handleChange("username", target.value)}
          value={login.username}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={({ target }) => handleChange("password", target.value)}
          value={login.password}
        />

        <div>
          <button type="submit">Login</button>
        </div>
        <p>
          don't have an account? <Link to="/register">Sign up now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
