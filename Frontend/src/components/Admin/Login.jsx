import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, clearMessages } from '../../slice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.username || !formData.password) {
      alert('Both fields are required !');
      return;
    }

    dispatch(loginAdmin(formData));
  };

  useEffect(() => {

    if (Object.keys(error).length > 0 || successMessage?.login) {
      // Clear messages after 3 seconds
      const timer = setTimeout(() => {
        if (successMessage?.login) {
          navigate('/addTopic');
        }
        dispatch(clearMessages());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch, navigate]);

  return (
    <div className='flex items-center justify-center bg-gradient-to-r from-purple-300 via-green-200 to-teal-200 min-h-screen p-4'>
      <form onSubmit={handleSubmit} className='bg-gray-50 w-full max-w-md p-8 rounded-2xl shadow-2xl'>
        <fieldset className='border-2 p-4 rounded-lg border-indigo-300'>
          <legend className='font-semibold tracking-wider text-2xl text-center text-blue-600'>LOGIN</legend>

          {/* Feedback */}
          {error?.login && (
            <div className="text-red-500 mb-4">

              <p>{error.login}</p>

            </div>
          )}

          {successMessage?.login && (
            <div className="text-green-500 mb-4">
              <p>{successMessage.login}</p>
            </div>
          )}

          <fieldset className='border-2 w-full max-w-md p-4 rounded-2xl shadow-2xl bg-amber-100'>
            <legend className='font-semibold tracking-wide text-lg text-orange-500'>Username</legend>
            <input
              type="text"
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
              autoComplete="username"
              className='px-4 py-2 rounded-xl w-full bg-black text-white font-semibold border-green-500'
            />
          </fieldset>

          <fieldset className='border-2 w-full max-w-md p-4 rounded-2xl shadow-2xl bg-amber-100 mt-4'>
            <legend className='font-semibold tracking-wide text-lg text-orange-400'>Password</legend>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              autoComplete="current-password"
              className='px-4 py-2 rounded-xl w-full bg-black text-white font-semibold border-green-500'
            />
          </fieldset>

          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              disabled={loading}
              className={`border-2 rounded-2xl px-4 py-2 text-xl font-semibold shadow-2xl tracking-wide cursor-pointer ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 text-white'
                }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
