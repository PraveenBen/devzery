import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [testCases, setTestCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    const response = await axios.get('http://localhost:5000/api/testcases');
    setTestCases(response.data);
  };

  const updateTestCase = async (id, updatedData) => {
    await axios.put(`http://localhost:5000/api/testcases/${id}`, updatedData);
    fetchTestCases();
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search issue..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">🔍</button>
      </div>
      <button className="filter-button">Filter ▼</button>
      <table>
        <thead>
          <tr>
            <th>Test Case Name</th>
            <th>Estimate Time</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase) => (
            <tr key={testCase.id}>
              <td>
                {testCase.name}
                <div className="last-updated">Last updated 2 minutes ago</div>
              </td>
              <td>5 Minutes</td>
              <td>{testCase.module}</td>
              <td>{testCase.priority}</td>
              <td>
                <select
                  className="status-select"
                  value={testCase.status}
                  onChange={(e) => updateTestCase(testCase.id, { ...testCase, status: e.target.value })}
                >
                  <option value="Select">Select</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
                <button className="pass-button">PASS</button>
                <button className="fail-button">FAIL</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;