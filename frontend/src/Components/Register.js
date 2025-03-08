import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: "100px" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Register</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="form-control mb-2" />
          <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required className="form-control mb-2" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="form-control mb-2" />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="form-control mb-2" />

          <div className="input-group mb-3">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required className="form-control" />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
