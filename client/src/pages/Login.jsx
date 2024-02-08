import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/user.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/login", {
        username,
        password,
      });

      if (response.data.status === "true") {
        setError(response.data.message);
        
        
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
         <h1>Chat App</h1>
      <h2>Login</h2>

      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <p className="error-message">{error}</p>

        <button onClick={login} disabled={loading}>
          Login
        </button>
      </form>

      <p className="text">Don't have an account?</p>

      <Link to="/register" style={{ textAlign: "center", textDecoration: "none" }}>
        <button className="register">Signup</button>
      </Link>
    </div>
  );
}
