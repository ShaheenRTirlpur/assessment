// pages/CreateScript.jsx
import React, { useState } from 'react';

export default function CreateScript() {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');

  const generateScript = async () => {
    // Dummy response simulating AI output
    const dummyResponse = `Script based on your prompt: "${prompt}"

Scene 1: Interior - Night
A lonely writer stares at a blank page, awaiting inspiration...`;

    setTimeout(() => {
      setScript(dummyResponse);
    }, 1000);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <textarea
        className="w-full border p-2 mb-4"
        rows="4"
        placeholder="Enter your script prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateScript} className="bg-blue-500 text-white px-4 py-2 mb-4">Generate</button>
      <pre className="bg-gray-100 p-4 whitespace-pre-wrap">{script}</pre>
    </div>
  );
}
