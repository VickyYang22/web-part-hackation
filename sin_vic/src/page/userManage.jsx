import NavBar from "../layout/navBar";
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "yellow",
    value: 50,
  },
  {
    id: 2,
    name: 'Basic Tee',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "red",
    value: 90,
  },
  {
    id: 3,
    name: 'Basic Tee',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "green",
    value: 30,
  },
  {
    id: 4,
    name: 'Basic Tee',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "green",
    value: 30,
  },
  // More products...
];

export default function UserManage() {
  const handleClick = () => {
    toast.success("Sent to admin successfully!");
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"> 
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-1 aspect-h-1 w-full h-64 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={`Image of ${product.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className={`mt-1 text-lg font-bold text-gray-900`}>{product.value}%</p>
                </div>
                <button
                  className="mt-4 text-sm font-bold text-white px-4 py-2 rounded-md"
                  style={{ backgroundColor: product.statusColor }}
                  onClick={handleClick}
                >
                  Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
