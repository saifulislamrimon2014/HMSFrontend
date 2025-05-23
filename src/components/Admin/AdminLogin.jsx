import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../doctor/DoctorLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/admin-login/", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
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

        <h2 className="login-title">Admin Login</h2>

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

export default AdminLogin;
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import "./DoctorLogin.css";

// function DoctorLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8000/api/doctor-login/", {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         toast.success("Login successful!");
//         localStorage.setItem("doctor", JSON.stringify(response.data.doctor));
//         // setTimeout(() => navigate("/DoctorDashboard"), 500);
//         setTimeout(500);
//         window.location.href = "/DoctorDashboard"; // Redirect to DoctorDashboard
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="doctor-login-container">
//       <div className="doctor-login-card">

//         <div className="back-button">
//           <Link to="/" className="btn btn-outline-dark btn-sm">
//             <FaArrowLeft /> Back
//           </Link>
//         </div>

//         <h2 className="login-title">Doctor Login</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DoctorLogin;
