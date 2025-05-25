// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Script Generator</h1>
      <Link to="/login" className="text-blue-500 underline">Login</Link>
    </div>
  );
}