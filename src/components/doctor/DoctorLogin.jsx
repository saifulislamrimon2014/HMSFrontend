import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../signInWIthGoogle";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../patient/login.css";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        toast.error("Please verify your email before logging in.", {
          position: "top-center",
        });
        return;
      }
      
      toast.success("Logged in successfully!", {
        position: "top-center",
      });
      window.location.href = "/DoctorDashboard";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address", {
        position: "top-center",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success(`Password reset email sent to ${resetEmail}`, {
        position: "top-center",
      });
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="login-container">
      {/* Back Arrow Button */}
      <div className="back-button mb-3">
        <Link to="/" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-2" /> 
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Doctor Login</h3>

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3 text-end">
          <a 
            href="#!" 
            onClick={() => setShowForgotPassword(true)}
            style={{ textDecoration: 'none' }}
          >
            Forgot password?
          </a>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          New user? <Link to="/register">Register here</Link>
        </p>
        <SignInwithGoogle /> */}

        {/* Forgot Password Modal */}
        <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Enter your email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Your registered email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForgotPassword(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleForgotPassword}>
              Send Reset Link
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}

export default DoctorLogin;