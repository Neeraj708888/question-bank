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

  // Handle input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert('Both fields are required!');
      return;
    }

    dispatch(loginAdmin(formData));
  };

  // Handle success / error messages
  useEffect(() => {
    if ((error && Object.keys(error).length > 0) || successMessage?.login) {
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
    <div
      className="flex items-center justify-center
                 min-h-screen min-h-[100svh] min-h-[100dvh]
                 bg-gradient-to-r from-purple-300 via-green-200 to-teal-200
                 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 w-full max-w-md
                   p-4 sm:p-8
                   rounded-2xl shadow-2xl"
      >
        <fieldset className="border-2 p-4 rounded-lg border-indigo-300">
          <legend
            className="font-semibold tracking-wider
                       text-xl sm:text-2xl
                       text-center text-blue-600"
          >
            LOGIN
          </legend>

          {/* Error Message */}
          {error?.login && (
            <p className="text-red-500 text-center mt-2">
              {error.login}
            </p>
          )}

          {/* Success Message */}
          {successMessage?.login && (
            <p className="text-green-500 text-center mt-2">
              {successMessage.login}
            </p>
          )}

          {/* Username */}
          <fieldset className="border-2 p-3 sm:p-4 rounded-2xl
                               shadow-xl bg-amber-100 mt-4">
            <legend className="font-semibold tracking-wide
                               text-base sm:text-lg
                               text-orange-500">
              Username
            </legend>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="username"
              className="w-full h-11 px-4 rounded-xl
                         bg-black text-white font-semibold
                         outline-none"
            />
          </fieldset>

          {/* Password */}
          <fieldset className="border-2 p-3 sm:p-4 rounded-2xl
                               shadow-xl bg-amber-100 mt-4">
            <legend className="font-semibold tracking-wide
                               text-base sm:text-lg
                               text-orange-400">
              Password
            </legend>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full h-11 px-4 rounded-xl
                         bg-black text-white font-semibold
                         outline-none"
            />
          </fieldset>

          {/* Button */}
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto
                          px-6 py-3 rounded-2xl
                          text-lg sm:text-xl font-semibold
                          shadow-2xl tracking-wide
                          transition
                          ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
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
