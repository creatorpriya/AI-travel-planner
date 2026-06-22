import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    console.log(
      "TOKEN SAVED:",
      localStorage.getItem("token")
    );

    navigate("/dashboard");

  } catch (error) {

    console.log(error.response?.data);

    alert("Login Failed");
  }
};

  return (
    <div className="container">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button>
          Login
        </button>

      </form>

      <br />

      <Link to="/register">
        Register
      </Link>

    </div>
  );
}

export default Login;