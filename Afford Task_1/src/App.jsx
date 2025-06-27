import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShortenerForm from './ShortenerForm.jsx'


function App() {
  
     return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <ShortenerForm />
      </div>
    </div>
  );
}

export default App
