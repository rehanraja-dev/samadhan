import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/students')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Student Data:', data); // Log the data to the console
        setStudents(data); // Update the state with the student data
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setError(error.message); // Set error message to show on UI
      });
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      <div>
        <h1>Student List</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error message */}
        <div className="student-list">
          {students.length > 0 ? (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  <h3>{student.name}</h3>
                  <p>Age: {student.age}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading student data...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
