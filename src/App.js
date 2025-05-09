import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { AuthContext, AuthProvider } from "./AuthContext";

// Components (Shortened for brevity)
import Home from "./components/Home";
import PatientLogin from "./components/patient/PatientLogin";
import SignUp from "./components/patient/register";
import Profile from "./components/patient/profile";
import PatientDashboard from "./components/patient/PatientDashboard";
import PatientAppointment from "./components/patient/PatientAppointment";
import AppointmentSchedule from "./components/patient/AppointmentSchedule";
import MakeAppointment from "./components/patient/MakeAppointment";
import PatientMedicalPage from "./components/patient/PatientMedicalPage";
import PaymentSelection from "./components/patient/PaymentSelection";
import BkashPayment from "./components/patient/BkashPayment";
import ConfirmationPage from "./components/patient/ConfirmationPage";

import DoctorLogin from "./components/doctor/DoctorLogin";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorProfile from "./components/doctor/DoctorProfile";
import DoctorAppointmentList from "./components/doctor/DoctorAppointmentList";
import DoctorPatientDetails from "./components/doctor/DoctorPatientDetails";
import DoctorIssuePrescription from "./components/doctor/DoctorIssuePrescription";
import DoctorRegisteredPatient from "./components/doctor/DoctorRegisteredPatient";



import AccountsDashboard from './components/Accounts/AccountsDashboard';
import AccountsInventory from './components/Accounts/AccountsInventory';
import AddPayment from './components/Accounts/AddPayment';
import AccountsEditProfile from './components/Accounts/AccountsEditProfile';
import TechnologistDashboard from './components/Technologist/TechnologistDashboard';
import TechnologistReportUpload from './components/Technologist/TechnologistReportUpload';
import TechnologistReportDelivery from './components/Technologist/TechnologistReportDelivery'
import TechnologistUpdateReport from './components/Technologist/TechnologistUpdateReport'
import TechnologisrEditProfile from './components/Technologist/TechnologistEditProfile'

import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";


import TechnologistEditProfile from "./components/Technologist/TechnologistEditProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminPatient from "./components/Admin/AdminPatient";
import AdminDoctor from "./components/Admin/AdminDoctor";
import AdminTechnologist from "./components/Admin/AdminTechnologist";
import AdminAccountant from "./components/Admin/AdminAccountant";
import AdminEditProfile from "./components/Admin/AdminEditProfile";
import AdminInventory from "./components/Admin/AdminInventory";
import AccountsLogin from "./components/Accounts/AccountsLogin";
import TechnologistLogin from "./components/Technologist/TechnologistLogin";
import AdminLogin from "./components/Admin/AdminLogin";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  const { user, doctor, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        doctor ? <Navigate to="/DoctorDashboard" replace /> :
        user ? <Navigate to="/PatientDashboard" replace /> :
        <Home />
      } />

      {/* Patient */}
      <Route path="/PatientLogin" element={user ? <Navigate to="/PatientDashboard" /> : <PatientLogin />} />
      <Route path="/register" element={user ? <Navigate to="/PatientDashboard" /> : <SignUp />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/PatientLogin" />} />
      <Route path="/PatientDashboard" element={user ? <PatientDashboard /> : <Navigate to="/PatientLogin" />} />
      <Route path="/PatientAppointments" element={user ? <PatientAppointment /> : <Navigate to="/PatientLogin" />} />
      <Route path="/AppointmentSchedule" element={user ? <AppointmentSchedule /> : <Navigate to="/PatientLogin" />} />
      <Route path="/MakeAppointment" element={user ? <MakeAppointment /> : <Navigate to="/PatientLogin" />} />
      <Route path="/PatientMedicalPage" element={user ? <PatientMedicalPage /> : <Navigate to="/PatientLogin" />} />
      <Route path="/PaymentSelection" element={user ? <PaymentSelection /> : <Navigate to="/PatientLogin" />} />
      <Route path="/BkashPayment" element={user ? <BkashPayment /> : <Navigate to="/PatientLogin" />} />
      <Route path="/AppointmentConfirmation" element={user ? <ConfirmationPage /> : <Navigate to="/PatientLogin" />} />

      {/* Doctor */}
      <Route path="/DoctorLogin" element={doctor ? <Navigate to="/DoctorDashboard" /> : <DoctorLogin />} />
      <Route path="/DoctorDashboard" element={doctor ? <DoctorDashboard /> : <Navigate to="/DoctorLogin" />} />
      <Route path="/DoctorProfile" element={doctor ? <DoctorProfile /> : <Navigate to="/DoctorLogin" />} />
      <Route path="/DoctorAppointmentList" element={doctor ? <DoctorAppointmentList /> : <Navigate to="/DoctorLogin" />} />
      <Route path="/DoctorPatientDetails" element={doctor ? <DoctorPatientDetails /> : <Navigate to="/DoctorLogin" />} />
      <Route path="/DoctorIssuePrescription" element={doctor ? <DoctorIssuePrescription /> : <Navigate to="/DoctorLogin" />} />
      <Route path="/DoctorRegisteredPatient" element={doctor ? <DoctorRegisteredPatient /> : <Navigate to="/DoctorLogin" />} />


      <Route path="/accounts" element={<AccountsDashboard />} />
           <Route path="/accountsinventory" element={<AccountsInventory />} />
           <Route path="/addpayment" element={<AddPayment />} />
           <Route path="/accountseditprofile" element={<AccountsEditProfile />} />
           <Route path="/technologistdashboard" element={<TechnologistDashboard />} />
           <Route path="/technologistReportUpload" element={<TechnologistReportUpload />} />
           <Route path="/technologistreportdelivery" element={<TechnologistReportDelivery />} />
           <Route path="/technologistupdatereport" element={<TechnologistUpdateReport />} />
           <Route path="/technologisteditprofile" element={<TechnologistEditProfile />} />
           <Route path="/admindashboard" element={<AdminDashboard />} />
           <Route path="/adminpatient" element={<AdminPatient />} />
            <Route path="/adminDoctor" element={<AdminDoctor />} />
            <Route path="/admintechnologist" element={<AdminTechnologist />} />
            <Route path="/adminaccountants" element={<AdminAccountant />} />
            <Route path="/admineditprofile" element={<AdminEditProfile />} />
            <Route path="/admininventory" element={<AdminInventory />} />
            <Route path="/accountslogin" element={<AccountsLogin />} />
            <Route path="/technologistlogin" element={<TechnologistLogin />} />
            <Route path="/adminlogin" element={<AdminLogin />} />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
