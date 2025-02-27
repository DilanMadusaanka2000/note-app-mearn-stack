import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
 
  //define State
  const[name, setName] = useState();
  const [email, setEmail] = useState();
  const[password, setPassword] = useState();
  const navigate =  useNavigate();
   

  //form sybmit handler
  const handleSubmit = async (e) => {

        e.preventDefault();

        try {

          const response = await axios.post('http://localhost:8800/api/auth/register', {
            name,
            email,
            password
             });

             console.log(response);
             alert('User registered successfully');

             navigate('/login');

          
        } catch (error) {

          console.log(error);
          
        }

  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"> 
            <label htmlFor="name" className="form-label">Name</label> 
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              required
              className="form-control" // Use form-control

            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              required
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="w-100 btn btn-success"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;