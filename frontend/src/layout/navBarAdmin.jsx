export default function NavBar() {
    console.log('NavBar is rendering');
    return (
      <nav className="w-full h-20 bg-green-600 text-white flex items-center justify-between px-10 shadow-lg rounded-b-lg border-b-4 border-green-700">
        <div className="flex justify-start items-center">
  <span className="text-4xl font-bold">EcoApp</span>
</div>
        <div className="flex items-center space-x-6">
          <a href="/profile" className="flex items-center space-x-2 bg-green-700 px-4 py-2 rounded-full hover:bg-green-800 transition-colors">
            <span className="font-bold text-lg">Mr Shan</span>
          </a>
          <a href="/settings" className="text-lg hover:text-gray-300 transition-colors">
            <span className="material-icons">settings</span>
          </a>
          <a href="/notifications" className="text-lg hover:text-gray-300 transition-colors">
            <span className="material-icons">notifications</span>
          </a>
        </div>
      </nav>
    );
  }
  