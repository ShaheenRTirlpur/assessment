// pages/Dashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-4">Welcome, {user?.name}</h1>
      <Link to="/create-script" className="text-blue-600 underline mr-4">Create New Script</Link>
      <button onClick={handleLogout} className="text-red-500 underline">Logout</button>
    </div>
  );
}
