import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      navigate("/");

    } catch {

      alert("Register Failed");
    }
  };

  return (
    <div className="container">

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button>
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;