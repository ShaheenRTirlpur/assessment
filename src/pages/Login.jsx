// pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Simulate login with dummy credentials
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'John Doe' }));
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input placeholder="Email" className="border p-2 mb-2" />
      <input type="password" placeholder="Password" className="border p-2 mb-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
}
