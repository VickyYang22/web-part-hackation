import NavBar from "../layout/navBar";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import Footer from "../layout/footer";





// Dummy product data
const products = [
  {
    id: 1,
    name: 'Organic Waste',
    imageSrc: '/images/bin1.png', 
    statusColor: "yellow",
    value: 50,
  },
  {
    id: 2,
    name: 'Plastic Waste',
    imageSrc: '/images/bin2.png',
    statusColor: "red",
    value: 90,
  },
  {
    id: 3,
    name: 'Can',
    imageSrc: '/images/bin3.png',
    statusColor: "green",
    value: 30,
  },
  {
    id: 4,
    name: 'Glass',
    imageSrc: '/images/bin4.png',
    statusColor: "green",
    value: 10,
  },
  //...
];

// Main 
export default function UserManage() {
  useEffect(() => {
    document.title = 'UserManage'; 
  }, []);

  // Dummy 
  
  const [userDetails, setUserDetails] = useState({
    id: '0001',
    name: 'YANG VICKY',
    location: '48 / 47 Ratchadamnoen Klang Road Bowon Niwet, Bangkok City, 24000, Thailand',
    tel: '123-456-7890',
  });

  const handleClick = () => {
    toast.success("Sent to admin successfully!");
  };

  //user details
  const generateUserDetails = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md my-4">
        <h3 className="text-xl font-semibold">Your Profile</h3>
        <p><strong>ID:</strong> {userDetails.id}</p>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Location:</strong> {userDetails.location}</p>
        <p><strong>Tel:</strong> {userDetails.tel}</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen" >
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">

        <div>
          <h2 className="text-2xl font-bold mb-4"></h2>
          {generateUserDetails()}
        </div>


        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
              {/*container   */}
              <div className="w-full h-64 lg:h-80">
                <img
                  alt={`Image of ${product.name}`}
                  src={product.imageSrc}
                  
                  className="w-auto h-auto object-contain mx-auto" //(e.g.,  8rem x 8rem)
                />
              </div>
              <div className="p-4 flex flex-col items-center justify-between">
  <div className="text-center">
     <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
    <p className="mt-1 text-lg font-bold text-gray-900">{product.value}%</p>
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
      <Footer />
    </div>
  );
}
