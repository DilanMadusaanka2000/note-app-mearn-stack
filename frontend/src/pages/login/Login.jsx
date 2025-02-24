import React, { useState, useNavigate } from 'react';

import axios from 'axios';

function Login() {
 
  //define State
  const [email, setEmail] = useState();
  const[password, setPassword] = useState();
  const navigate =  useNavigate();
   

  //form sybmit handler
  const handleSubmit = async (e) => {

        e.preventDefault();

        try {

          const response = await axios.post('http://localhost:5000/api/auth/login', {
            
            email,
            password
             });

             if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
             }

             console.log(response);
             alert('User Login successfully');
          
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
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;