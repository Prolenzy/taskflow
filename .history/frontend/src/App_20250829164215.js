import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={
              <>
                <Navbar />
                <div className="container">
                  <Login />
                </div>
              </>
            } />
            <Route path="/register" element={
              <>
                <Navbar />
                <div className="container">
                  <Register />
                </div>
              </>
            } />
            <Route 
              path="/dashboard" 
              element={
                <>
                  <Navbar />
                  <div className="container">
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </div>
                </>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;