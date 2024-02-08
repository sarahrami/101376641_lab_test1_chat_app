import React, {useState } from "react";
import axios from "axios";
import "../components/user.css";
import { Link } from "react-router-dom"
export default function Register() {
  
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (event) => {
      event.preventDefault(); 
      if (!username || !firstname || !lastname || !password) {
          setError("Please fill in all fields");
      }
      try {
          setLoading(true);
          const response = await axios.post("http://localhost:3002/register",
           { username, firstname, lastname, password });

          if (response.data.status === "true") {
              setError(response.data.message);
              setUsername('')
              setFirstName('')
              setLastName('')
              setPassword('')
              setError(null);
            
          } else {
              setError(response.data.message);
          }

      } catch (error) {
          console.error(error.message);
      } finally {
          setLoading(false);

      }
  };

return (
      <div className='signup'>
        <h1>Chat App</h1>
        
          <h2>Sign up</h2>
 
      <input type="text" placeholder="Username"
      value={username} onChange={(e) => setUsername(e.target.value)} />

      <input type="text" placeholder="First Name"
      value={firstname} onChange={(e) => setFirstName(e.target.value)}/>


      <input type="text" placeholder="Last Name"
      value={lastname} onChange={(e) => setLastName(e.target.value)}/>

  
      <input type="password" 
      placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>{error}</p>
  
          <button onClick={signup} disabled={loading}>
              Sign up
          </button>
          <p style={{alignSelf: 'center', color: 'black'}}>Already got an account?</p>
          <Link to='/login' style={{alignSelf: 'center', textDecoration: 'none'}}>
              Login
          </Link>
   
  </div>
)
}
