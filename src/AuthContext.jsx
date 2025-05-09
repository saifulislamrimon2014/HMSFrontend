// src/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./components/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Patient (Firebase)
  const [doctor, setDoctor] = useState(null); // Doctor (MongoDB)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorData = localStorage.getItem("doctor");
    if (doctorData) {
      setDoctor(JSON.parse(doctorData));
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser && (authUser.emailVerified || authUser.providerData.some(p => p.providerId === "google.com"))) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, doctor, setDoctor, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
