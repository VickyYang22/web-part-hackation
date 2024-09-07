import { useNavigate } from 'react-router-dom'  ;

import React, { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    document.title = 'Login Page'; // Set the title for this page
  }, []);

  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    navigate('/userManage');
  };

  const handleSubmit2 = (event) => {
    event.preventDefault(); 

    navigate('/register');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12 lg:px-8"
    style={{
      backgroundSize: "cover", 
      backgroundPosition: "center", 

      backgroundImage: "url(/images/backgound-login.jpg)", 
    }}
    >

      <div className="sm:w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <img
            className="mx-auto h-50 w-40"
            alt="Logo"
            src="https://i.pinimg.com/564x/70/fa/74/70fa748be8bc074a20d900678352bbec.jpg"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-11"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/register" className="font-medium text-green-600 hover:text-green-500" onClick={handleSubmit2}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
