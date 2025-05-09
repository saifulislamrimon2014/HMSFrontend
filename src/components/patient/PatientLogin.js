import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../signInWIthGoogle";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

function PatientLogin() {
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
      window.location.href = "/PatientDashboard"; // Redirect to PatientDashboard
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
    <>
      <style>
        {`
          .login-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .login-container h3 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .login-container form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .login-container label {
            font-weight: 500;
            color: #555;
          }

          .login-container .form-control {
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ced4da;
            transition: border-color 0.3s ease;
          }

          .login-container .form-control:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
          }

          .login-container .btn-primary {
            background-color: #007bff;
            border: none;
            padding: 10px;
            font-weight: 500;
            transition: background-color 0.3s ease;
          }

          .login-container .btn-primary:hover {
            background-color: #0056b3;
          }

          .login-container .btn-primary:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
          }

          .login-container .forgot-password {
            margin-top: 10px;
            text-align: center;
            color: #555;
          }

          .login-container .forgot-password a {
            color: #007bff;
            text-decoration: none;
          }

          .login-container .forgot-password a:hover {
            text-decoration: underline;
          }

          .back-button {
            display: flex;
            justify-content: flex-start;
          }

          .back-button .btn-outline-secondary {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            font-size: 16px;
            border-radius: 4px;
            color: #6c757d;
            border-color: #6c757d;
            transition: all 0.3s ease;
          }

          .back-button .btn-outline-secondary:hover {
            background-color: #f8f9fa;
            color: #495057;
            border-color: #495057;
          }

          .back-button .me-2 {
            margin-right: 8px;
          }

          .text-end a {
            color: #007bff;
            text-decoration: none;
            font-size: 14px;
          }

          .text-end a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="login-container">
        {/* Back Arrow Button */}
        <div className="back-button mb-3">
          <Link to="/" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

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
          <p className="forgot-password text-right">
            New user? <Link to="/register">Register here</Link>
          </p>
          <SignInwithGoogle />

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
    </>
  );
}

export default PatientLogin;