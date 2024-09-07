export default function NavBar() {
  console.log('NavBar is rendering');
  return (
    <nav className="w-full h-20 bg-green-800 text-white flex items-center justify-between px-10 shadow-lg rounded-b-lg border-b-4 border-green-900">
      <div className="flex items-center space-x-4">
  <img
    src="/images/coins.png" 
    alt="Logo"
    className="h-20 w-20" 
  />
  <span className="font-bold text-2xl ">100 Coins</span>
</div>

      <div className="text-center flex-grow ">
        <span className="text-3xl font-bold pl-9">Trash To Cash</span>
      </div>
      <div className="flex items-center space-x-6">
        <a href="/profile" className="flex items-center space-x-2 bg-green-900 px-4 py-2 rounded-full hover:bg-green-800 transition-colors">
          <span className="font-bold text-lg">Mr.YANG VICKY</span> 
        </a>
        <a href="/settings" className="text-lg hover:text-gray-300  transition-colors">
          <span className="material-icons">settings</span>
        </a>
        <a href="/notifications" className="text-lg hover:text-gray-300 transition-colors">
          <span className="material-icons">notifications</span>
        </a>
      </div>
    </nav>
  );
}
