import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../doctor/DoctorLogin.css";

function AccountsLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/accountant-login/", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        // Store accountant data in localStorage
        localStorage.setItem("accountant", JSON.stringify(response.data.accountant));
        // Redirect to Accounts Dashboard
        setTimeout(() => {
          navigate("/AccountsDashboard");
        }, 500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-card">

        <div className="back-button">
          <Link to="/" className="btn btn-outline-dark btn-sm">
            <FaArrowLeft /> Back
          </Link>
        </div>

        <h2 className="login-title">Accounts Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountsLogin;


