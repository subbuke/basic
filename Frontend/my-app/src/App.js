import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("https://zany-waddle-pjpwj555vgw39r5v-3001.app.github.dev/getusers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(err => {
        console.log(err);
        setError('Failed to fetch users');
      });
  }, []);

  const Submit = () => {
    if (!name || !age) {
      setError('Name and age are required');  
      return;
    }

    axios.post('https://zany-waddle-pjpwj555vgw39r5v-3001.app.github.dev/getusers', { name, age })
      .then((response) => {
        setUsers([...users, response.data]); // Add the new user to the list
        setName(''); // Clear the name input
        setAge(''); // Clear the age input
        setError(''); // Clear any previous error
      })
      .catch(err => {
        console.log(err);
        setError('Failed to create user');
      });
  };

  return (
    <div className="App">
      <h1>MERN application (basic)</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        users.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
          </div>
        ))
      }
      <br />
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Age'
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={Submit}>Create User</button>
    </div>
  );
}

export default App;