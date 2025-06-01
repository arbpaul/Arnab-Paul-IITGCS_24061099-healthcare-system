import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    patientID: '',
    name: '',
    age: '',
    gender: '',
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    },
    allergies: '',
    medicalHistory: '',
    currentPrescriptions: '',
    doctorNotes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['phone', 'email', 'address'].includes(name)) {
      setFormData({ 
        ...formData, 
        contactInfo: { 
          ...formData.contactInfo, 
          [name]: value 
        } 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      allergies: formData.allergies.split(','),
      medicalHistory: formData.medicalHistory.split(','),
      currentPrescriptions: formData.currentPrescriptions.split(','),
      doctorNotes: formData.doctorNotes.split(',')
    };
    try {
      await axios.post('http://localhost:5000/api/patients', payload);
      navigate('/');
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input name="patientID" placeholder="Patient ID" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="gender" placeholder="Gender" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="allergies" placeholder="Allergies (comma separated)" onChange={handleChange} />
        <input name="medicalHistory" placeholder="Medical History (comma separated)" onChange={handleChange} />
        <input name="currentPrescriptions" placeholder="Current Prescriptions (comma separated)" onChange={handleChange} />
        <input name="doctorNotes" placeholder="Doctor Notes (comma separated)" onChange={handleChange} />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
