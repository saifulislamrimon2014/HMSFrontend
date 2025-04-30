import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/patient/login";
import SignUp from "./components/patient/register";
import Home from "./components/Home";
import Profile from "./components/patient/profile";
import DoctorLogin from "./components/doctor/DoctorLogin";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorProfile from "./components/doctor/DoctorProfile";
import DoctorAppointmentList from "./components/doctor/DoctorAppointmentList";
import DoctorHeader from "./components/doctor/DoctorHeader";
import DoctorFooter from "./components/doctor/DoctorFooter";
import DoctorPatientDetails from "./components/doctor/DoctorPatientDetails";
import DoctorIssuePrescription from "./components/doctor/DoctorIssuePrescription";
import DoctorRegisteredPatient from "./components/doctor/DoctorRegisteredPatient";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Check if user is verified or signed in with Google
        if (authUser.emailVerified || authUser.providerData.some(provider => provider.providerId === 'google.com')) {
          setUser(authUser);
        } else {
          // If not verified and not Google, log them out
          auth.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" replace /> : <Home />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/profile" replace />
              ) : (
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <Login />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/profile" replace />
              ) : (
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <SignUp />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/DoctorLogin"
            element={
              user ? (
                <Navigate to="/DoctorProfile" replace />
              ) : (
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <DoctorLogin />
                  </div>
                </div>
              )
            }
          />
            <Route
              path="/DoctorDashboard"
              element={
                user ? (
                  <DoctorDashboard />
                ) : (
                  <Navigate to="/DoctorLogin" replace />
                )
              }
            />
            <Route
              path="/DoctorProfile"
              element={
                user ? (
                  <DoctorProfile />
                ) : (
                  <Navigate to="/DoctorLogin" replace />
                )
              }
              
            />
            <Route
              path="/DoctorAppointmentList"
              element={
                user ? (
                  <DoctorAppointmentList />
                ) : (
                  <Navigate to="/DoctorLogin" replace />
                )
              }
            />
          <Route
            path="/DoctorPatientDetails"
            element={
              user ? <DoctorPatientDetails /> : <Navigate to="/DoctorLogin" replace />
            }
          />
          <Route
            path="/DoctorIssuePrescription"
            element={user ? <DoctorIssuePrescription /> : <Navigate to="/DoctorLogin" replace />}
          />
          <Route
            path="/DoctorRegisteredPatient"
            element={user ? <DoctorRegisteredPatient /> : <Navigate to="/DoctorLogin" replace />}
          />


        </Routes>
        

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;