import { useState } from 'react';

export default function ApiKeyPrompt({ onClose, onSave }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!input || input.length < 8) {
      setError('API key must be at least 8 characters.');
      return;
    }
    onSave(input);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-80 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Enter API Key</h2>
        <input
          type="password"
          className="w-full rounded-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          placeholder="Your API key..."
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
        />
        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
        <div className="flex gap-3 mt-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            onClick={onClose}
          >Cancel</button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            onClick={handleSave}
          >Save</button>
        </div>
      </div>
    </div>
  );
}
