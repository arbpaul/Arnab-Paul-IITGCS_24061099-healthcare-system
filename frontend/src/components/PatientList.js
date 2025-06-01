import React, { useEffect, useState } from 'react';
import api from '../api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const deletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.delete(`/patients/${id}`);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient._id);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/patients/${editingPatient}`, formData);
      setEditingPatient(null);
      setFormData({ name: '', age: '', gender: '' });
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <h2>All Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {editingPatient === patient._id ? (
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Age"
                />
                <input
                  type="text"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  placeholder="Gender"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingPatient(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {patient.name} ({patient.age} yrs) - {patient.gender}
                <button onClick={() => handleEditClick(patient)}>Edit</button>
                <button onClick={() => deletePatient(patient._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
