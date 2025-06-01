import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Healthcare Patient Management System</h1>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add" element={<AddPatient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

