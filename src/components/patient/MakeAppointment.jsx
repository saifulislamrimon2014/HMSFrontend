import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import PatientHeader from "./PatientHeader";
import DoctorFooter from "../doctor/DoctorFooter";
import "../Homepage.css";
import "./MakeAppointment.css";
import { useNavigate } from "react-router-dom";

const MakeAppointment = () => {
  const [isSelf, setIsSelf] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const initialFormState = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    problem: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch user info from backend when "self" is selected
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const res = await axios.get(`http://localhost:8000/api/user/${user.uid}/`);
          setUserDetails(res.data);
          setFormData({
            name: `${res.data.firstName} ${res.data.lastName}`,
            age: res.data.age || "",
            gender: res.data.gender || "",
            phone: res.data.contactNumber || "",
            problem: "",
          });
        } catch (error) {
          toast.error("Failed to fetch user info");
        }
      }
    };

    if (isSelf === "self") {
      fetchUserData();
    } else if (isSelf === "other") {
      setFormData(initialFormState); // Reset form if "Someone Else"
    }
  }, [isSelf]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const navigate = useNavigate();
  const handleProceedToPayment = () => {
    navigate("/PaymentSelection");
  };

  
  // Submit form to backend
  const handleConfirmAppointment = async () => {
    try {
      const user = auth.currentUser;
      const dataToSend = {
        uid: user?.uid,
        ...formData,
        is_self: isSelf === "self"
      };

      await axios.post("http://localhost:8000/api/create-appointment/", dataToSend);
      toast.success("Appointment successfully saved!");
    } catch (error) {
      toast.error("Failed to save appointment");
      console.error(error);
    }
  };



  return (
    <div className="MakeAppointment">
      <PatientHeader />

      <div className="make-appointment-container">
        <h3>Who is this appointment for?</h3>
        <label>
          <input
            type="radio"
            name="identity"
            value="self"
            checked={isSelf === "self"}
            onChange={() => setIsSelf("self")}
          />
          Myself
        </label>
        <label>
          <input
            type="radio"
            name="identity"
            value="other"
            checked={isSelf === "other"}
            onChange={() => setIsSelf("other")}
          />
          Someone Else
        </label>

        {(isSelf === "self" || isSelf === "other") && (
          <div className="appointment-form">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
            />

            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            />

            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
            />

            <label>Problem Description:</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows="3"
              placeholder="Briefly describe the issue"
            ></textarea>

            {/* <button className="btn-payment" onClick={handleConfirmAppointment}>
              Proceed to Payment
            </button> */}
            <button className="btn-payment" onClick={handleProceedToPayment} >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>

      <DoctorFooter />
    </div>
  );
};

export default MakeAppointment;
