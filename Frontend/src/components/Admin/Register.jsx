import React, { useEffect, useState } from 'react';
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
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdmin(formData));
  };

  // Handle messages & redirect
  useEffect(() => {
    if ((error && Object.keys(error).length > 0) || successMessage?.register) {
      const timer = setTimeout(() => {
        if (successMessage?.register) {
          navigate('/login');
        }
        dispatch(clearMessages());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch, navigate]);

  return (
    <div
      className="flex items-center justify-center
                 min-h-screen min-h-[100svh] min-h-[100dvh]
                 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md
                   p-4 sm:p-8
                   rounded-2xl shadow-2xl"
      >
        <fieldset className="border-2 border-indigo-500 p-4 rounded-lg">
          <legend
            className="text-lg sm:text-xl
                       font-semibold text-indigo-700
                       text-center tracking-wider"
          >
            REGISTER ADMIN
          </legend>

          {/* Error Message */}
          {error?.register && (
            <p className="text-red-600 font-semibold text-center mt-2">
              {error.register}
            </p>
          )}

          {/* Success Message */}
          {successMessage?.register && (
            <p className="text-green-600 font-semibold text-center mt-2">
              {successMessage.register}
            </p>
          )}

          <div className="flex flex-col gap-4 mt-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              autoComplete="username"
              className="w-full h-11 px-4 rounded-2xl
                         bg-black text-white font-semibold
                         border-2 border-blue-500
                         outline-none"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              autoComplete="email"
              className="w-full h-11 px-4 rounded-2xl
                         bg-black text-white font-semibold
                         border-2 border-blue-500
                         outline-none"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full h-11 px-4 rounded-2xl
                         bg-black text-white font-semibold
                         border-2 border-blue-500
                         outline-none"
              required
            />

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto
                            px-6 py-3 rounded-2xl
                            text-lg font-semibold
                            shadow-xl tracking-wide
                            transition
                            ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-900 text-white hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
