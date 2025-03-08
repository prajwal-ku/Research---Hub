import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggedInMessage, setLoggedInMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoggedInMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setLoggedInMessage("Successfully logged in! Redirecting...");
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
        <p className="text-center text-muted">Access your research workspace</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {loggedInMessage && <div className="alert alert-success">{loggedInMessage}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          New here? <a href="/register" className="text-primary fw-bold">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
