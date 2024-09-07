import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add form validation and API call here

    // Redirect to user management page after successful login
    navigate('/userManage');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12 lg:px-8"
    style={{
      backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/040/140/060/non_2x/ai-generated-generative-ai-green-park-near-high-rise-buildings-urban-landscape-green-spaces-sustainable-living-eco-friendly-skyline-photo.jpg)", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
    }}
    >
      <div className="sm:w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <img
            alt="Logo"
            src="https://i.pinimg.com/564x/70/fa/74/70fa748be8bc074a20d900678352bbec.jpg"
            className="mx-auto h-50 w-40"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
            <a href="/register" className="font-medium text-green-600 hover:text-green-500">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
