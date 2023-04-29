import React, { createContext, useEffect, useState } from 'react';

// services
import userServices from '../services/userServices';

//create context
export const GlobalContext = createContext();

//provider component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [prevTrackData, setPrevTrackData] = useState([]);
  const [currentTrackData, setCurrentTrackData] = useState(null);

  const [splits, setSplits] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  let timeout;
  const setLoadingTimeout = () => {
    timeout = setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  useEffect(() => {
    userServices.getCurrentUser().then((user) => setUser(user));
  }, []);

  useEffect(() => {
    setIsModalOpen(false);
    setIsMenuOpen(false);
  }, [user]);

  const globalState = {
    user,
    setUser,
    setLoadingTimeout,
    timeout,
    loading,
    setLoading,
    isModalOpen,
    setIsModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    splits,
    setSplits,
    workouts,
    setWorkouts,
    prevTrackData,
    error,
    setError,
    currentWorkout,
    setCurrentTrackData,
    currentTrackData,
    setCurrentWorkout,
    setPrevTrackData,
  };

  return <GlobalContext.Provider value={globalState}>{children}</GlobalContext.Provider>;
};
