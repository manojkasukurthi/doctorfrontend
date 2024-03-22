import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctors data
    axios.get('/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));

    // Fetch patients data
    axios.get('/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = parseInt(e.target.value, 10);
    const doctor = doctors.find(doc => doc.id === selectedDoctorId);
    setSelectedDoctor(doctor);
  };

  return (
    <div className='App'>
      <h1>Doctor & Patient Information</h1>
      <label htmlFor="doctorDropdown">Select a Doctor:</label>
      <select id="doctorDropdown" onChange={handleDoctorChange} value={selectedDoctor ? selectedDoctor.id : ''}>
        <option value="">All Doctors</option>
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <div>
        {selectedDoctor ? (
          <div>
            <h2>Selected Doctor: {selectedDoctor.name}</h2>
            <h3>Patients Assigned:</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Disease</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {patients
                  .filter(patient => patient.doctor === selectedDoctor.name)
                  .map(patient => (
                    <tr key={patients.id}>
                      <td>{patient.name}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.disease}</td>
                      <td>{patient.doctor}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>All Doctors</h2>
            <ul>
              {doctors.map(doctor => (
                <li key={doctor.id}>
                  {doctor.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
