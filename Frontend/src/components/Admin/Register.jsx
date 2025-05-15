// Register Admin / User

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, createAdmin } from '../../slice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle Input Field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdmin(formData));
  }

  // Auto-Clear Messages after 4 seconds
  useEffect(() => {
    if (Object.keys(error).length || successMessage?.register || error) {
      const timer = setTimeout(() => {
        if (successMessage?.register) {
          navigate('/login');
        }
        dispatch(clearMessages()); 
      }, 1000);

      return () => clearTimeout(timer);

    }
  }, [successMessage, error, dispatch]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md'>
        <fieldset className='border-2 border-indigo-500 p-4 rounded-lg'>
          <legend className='text-xl font-semibold text-indigo-700 text-center tracking-wider'>REGISTER ADMIN</legend>

          {error?.register && <p className='text-red-600 font-semibold text-center tracking-wider'>{error.register}</p>}
            {successMessage?.register && <p className='text-green-600 font-semibold text-center tracking-wider'>{successMessage?.register}</p>}

          <div className='flex flex-col gap-4 mt-4'>
            <input type="text"
              name='username' 
              placeholder='Username'
              onChange={handleChange}
              autoComplete='username'
              className='text-white bg-black p-2 border-2 rounded-2xl border-blue-500 shadow-2xl font-semibold'
              required
            />
            <input type="email" 
            name='email' 
            placeholder='Email' 
            onChange={handleChange}
            autoComplete='email'
              className='text-white bg-black p-2 border-2 rounded-2xl border-blue-500 shadow-2xl font-semibold'
              required />
            <input 
            type="password" 
            name='password' 
            placeholder='Password' 
            onChange={handleChange}
            autoComplete='new-password'
              className='text-white bg-black p-2 border-2 rounded-2xl border-blue-500 shadow-2xl font-semibold'
              required />

            <div className='flex justify-end'>
              <button type='submit' className='text-xl text-right border-2 px-2 py-2 rounded-2xl bg-blue-900 text-white cursor-pointer hover:text-green-600 hover:bg-yellow-100 hover:font-extrabold'>{loading ? 'Registering...' : 'Register'}</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Register


