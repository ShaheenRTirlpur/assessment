// pages/Signup.jsx
import React from 'react';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input placeholder="Email" className="border p-2 mb-2" />
      <input placeholder="Password" className="border p-2 mb-2" />
      <button className="bg-green-500 text-white px-4 py-2">Sign Up</button>
    </div>
  );
}