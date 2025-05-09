import React, { createContext, useState, useEffect } from "react";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Check if doctor is logged in from localStorage
    const storedDoctor = localStorage.getItem('doctor');
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }

    // Check if admin is logged in from localStorage
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle doctor logout
  const doctorLogout = () => {
    localStorage.removeItem('doctor');
    setDoctor(null);
  };

  // Function to handle admin logout
  const adminLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  // Provide the context value
  const value = {
    user,
    doctor,
    admin,
    loading,
    doctorLogout,
    adminLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
