export default function NavBar() {
  console.log('NavBar is rendering');
  return (
    <div className="w-full h-20 bg-green-600 text-white flex items-center justify-between px-10 shadow-lg rounded-b-lg border-b-4 border-green-700">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">🌿</span>
        <span className="font-bold text-2xl">100 Points</span>
      </div>
      <div className="text-center flex-grow">
        <span className="text-3xl font-bold">EcoApp</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-green-700 px-4 py-2 rounded-full">
          <span className="font-bold text-lg">Mr. Soulasin</span>
        </div>
      </div>
    </div>
  );
}
