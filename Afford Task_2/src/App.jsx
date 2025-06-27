import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShortenerForm from './ShortnerForm'

function App() {
  

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-3xl p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener + Statistics</h1>
      <ShortenerForm />
    </div>
  </div>
      </>
  )
}

export default App
