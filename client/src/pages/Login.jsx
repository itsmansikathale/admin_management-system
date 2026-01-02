// Checking if the Client & Server is connected or not (First test)

import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });

      console.log("LOGIN API RESPONSE:", res.data);

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR FULL:", err);
      console.error("LOGIN ERROR RESPONSE:", err.response?.data);
      console.error("LOGIN ERROR STATUS:", err.response?.status);
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
