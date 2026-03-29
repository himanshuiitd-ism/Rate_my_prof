import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfs } from "./api";
import { Analytics } from "@vercel/analytics/react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fetch professors only once on mount
  useEffect(() => {
    let mounted = true;

    const loadProfessors = async () => {
      // If we already have professors, don't fetch again
      if (professors.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProfs();

        if (mounted) {
          const profArray = Array.isArray(data) ? data : data.professors || [];
          setProfessors(profArray);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfessors();

    return () => {
      mounted = false;
    };
  }, []); // Only run once on mount

  // Function to refresh professors if needed
  const refreshProfessors = async () => {
    try {
      setLoading(true);
      const data = await fetchProfs();
      const profArray = Array.isArray(data) ? data : data.professors || [];
      setProfessors(profArray);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    professors,
    loading,
    error,
    scrollPosition,
    setScrollPosition,
    refreshProfessors,
  };

  return (
    <AppContext.Provider value={value}>
      {" "}
      {children}
      <Analytics />
    </AppContext.Provider>
  );
};
