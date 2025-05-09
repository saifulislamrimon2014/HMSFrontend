
import React from 'react';
import './PatientMedicalPage.css';
import PatientHeader from './PatientHeader';
import DoctorFooter from '../doctor/DoctorFooter';

const prescriptions = [
  { id: 1, presId: '12344', doctor: 'MD KARIM', date: '04/04/24' },
  { id: 2, presId: '23332', doctor: 'MD RAHIM', date: '02/04/24' },
  { id: 3, presId: '13322', doctor: 'MD RABBI', date: '01/03/24' }
];

const reports = [
  { id: 1, slip: '12344', type: 'BLOOD TEST', date: '04/04/24' },
  { id: 2, slip: '23332', type: 'X-RAY', date: '02/04/24' },
  { id: 3, slip: '13322', type: 'CT SCAN', date: '01/03/24' }
];

const PatientMedicalPage = () => {
  const openPdf = (type, id) => {
    alert(`Open ${type} PDF with ID: ${id}`);
    // Replace alert with actual PDF logic if available
  };

  return (
    <div className="PatientMedicalPage">
      <PatientHeader />

      <div className="content-wrapper">
        <h4 className="section-title">PRESCRIPTION HISTORY</h4>
        <table className="history-table">
          <thead>
            <tr>
              <th>PRESCRIPTION NO</th>
              <th>Pres. ID NO</th>
              <th>ISSUED BY(DOCTOR)</th>
              <th>ISSUE DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.presId}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                <td><button onClick={() => openPdf('prescription', item.presId)}>OPEN</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="section-title">MEDICAL REPORT HISTORY</h4>
        <table className="history-table">
          <thead>
            <tr>
              <th>REPORT NO</th>
              <th>SLIP NO</th>
              <th>REPORT TYPE</th>
              <th>ISSUE DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.slip}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td><button onClick={() => openPdf('report', item.slip)}>OPEN</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DoctorFooter />
    </div>
  );
};

export default PatientMedicalPage;
