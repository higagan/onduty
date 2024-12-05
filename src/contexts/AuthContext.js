// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import hospitalsData from '../data/hospitals';
import tasksData from '../data/tasks';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, type, hospitalName, hospitalId }
  const [hospitals, setHospitals] = useState(hospitalsData);
  const [tasks, setTasks] = useState(tasksData); // Added setTasks to manage tasks
  const [bookings, setBookings] = useState([]); // { bookingId, taskId, userId, bookingDetails }

  // Function to update user profile
  const updateUserProfile = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  const register = (data) => {
    // Mock registration logic
    console.log('Registered user:', data);
    if (data.type === 'Doctor') {
      setUser({ username: data.username, type: 'Doctor' });
    } else if (data.type === 'Hospital') {
      setUser({ username: data.username, type: 'Hospital' });
    }
    return true;
  };

  const completeHospitalRegistration = (hospitalData) => {
    const newHospital = {
      hospital_id: hospitals.length + 1,
      name: hospitalData.name,
      address: hospitalData.address,
      about: hospitalData.about,
      contact: hospitalData.contact,
      added_date: new Date().toISOString(),
      image: hospitalData.image,
    };
    setHospitals([...hospitals, newHospital]);
    setUser({ username: newHospital.name, type: 'Hospital', hospitalId: newHospital.hospital_id });
    return true;
  };

  const login = ({ username, password }) => {
    // Mock login logic
    console.log('Logging in with:', username, password);
    const hospital = hospitals.find(h => h.name.toLowerCase() === username.toLowerCase());
    if (hospital) {
      setUser({ username: hospital.name, type: 'Hospital', hospitalId: hospital.hospital_id });
      return true;
    } else {
      setUser({ username, type: 'Doctor' });
      return true;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const bookTask = (taskId, bookingDetails) => {
    const newBooking = {
      bookingId: bookings.length + 1,
      taskId,
      userId: user.type === 'Doctor' ? user.username : user.hospitalId,
      bookingDetails,
    };
    setBookings([...bookings, newBooking]);
    // In a real app, update the backend accordingly
  };

  // Function to add a new task
  const addTask = (taskData) => {
    const newTask = {
      task_id: tasks.length + 1,
      hospital_id: user.hospitalId, // Associate task with the hospital
      department: taskData.department,
      date: taskData.date,
      shift: taskData.shift,
      qualification: taskData.qualification,
      // Add other necessary fields as needed
    };
    setTasks([...tasks, newTask]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      updateUserProfile, 
      register, 
      login, 
      logout, 
      hospitals, 
      tasks, 
      bookTask,
      bookings,
      completeHospitalRegistration,
      addTask // Expose addTask to components
    }}>
      {children}
    </AuthContext.Provider>
  );
};
