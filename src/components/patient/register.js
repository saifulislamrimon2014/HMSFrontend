import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase"; // Keep Firebase auth
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    dateOfBirth: "",
    address: "",
    bloodGroup: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.contactNumber.match(/^[0-9]{10,15}$/))
      newErrors.contactNumber = "Invalid phone number";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!/^01\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Phone number must start with 01 and be exactly 11 digits.";
    }
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "student.green.edu.bd",
    ];
    const emailParts = formData.email.split("@");
    if (
      emailParts.length !== 2 ||
      !allowedDomains.includes(emailParts[1].toLowerCase())
    ) {
      newErrors.email = "Email must be a valid Gmail, Yahoo, or Outlook address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

    
      await sendEmailVerification(userCredential.user);

    
      const userData = {
        firebase_uid: userCredential.user.uid, 
        first_name: formData.firstName, 
        last_name: formData.lastName,
        email: formData.email,
        contact_number: formData.contactNumber,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
        blood_group: formData.bloodGroup,
        email_verified: false,
      };

      const response = await fetch("http://127.0.0.1:8000/api/save-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          `Verification email sent to ${formData.email}. Please verify your email before logging in.`,
          { position: "top-center" }
        );
        navigate("/login");
      } else {
        throw new Error(data.error || "Failed to save user data to backend");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      toast.error(error.message, { position: "top-center" }); 
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3 position-relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="col-md-6 mb-3 position-relative">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Contact Number</label>
            <input
              type="tel"
              className={`form-control ${
                errors.contactNumber ? "is-invalid" : ""
              }`}
              placeholder="Enter phone number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              maxLength={11}
              required
            />
            {errors.contactNumber && (
              <div className="invalid-feedback">{errors.contactNumber}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className={`form-control ${
                errors.dateOfBirth ? "is-invalid" : ""
              }`}
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Enter your address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Blood Group</label>
          <select
            className={`form-control ${errors.bloodGroup ? "is-invalid" : ""}`}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <div className="invalid-feedback">{errors.bloodGroup}</div>
          )}
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
        <p className="forgot-password text-right mt-3">
          Already registered? <Link to="/login">Login Here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;