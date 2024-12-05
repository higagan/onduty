// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Task/TaskList';
import BookingForm from './components/Task/BookingForm';
import HospitalRegister from './components/Hospital/HospitalRegister';
import StaffProfile from './components/Profile/StaffProfile';
import HospitalProfile from './components/Profile/HospitalProfile';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container sx={{ marginTop: 4, marginBottom: 4 }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hospital-register" element={<ProtectedRoute userType="Hospital"><HospitalRegister /></ProtectedRoute>} />
            <Route path="/book/:taskId" element={<ProtectedRoute userType="Doctor"><BookingForm /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileRoute /></ProtectedRoute>} />
            {/* Catch-all route redirects to Listings */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

// Helper component to redirect based on user type
function ProfileRoute() {
  const { user } = React.useContext(AuthContext);
  if (user.type === 'Doctor') {
    return <StaffProfile />;
  } else if (user.type === 'Hospital') {
    return <HospitalProfile />;
  } else {
    return <Navigate to="/" />;
  }
}

// ProtectedRoute component to guard private routes
function ProtectedRoute({ children, userType }) {
  const { user } = React.useContext(AuthContext);
  
  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (userType && user.type !== userType) {
    // If user type doesn't match, redirect to Listings
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
