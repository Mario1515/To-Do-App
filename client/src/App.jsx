import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;