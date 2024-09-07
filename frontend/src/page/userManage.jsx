import NavBar from "../layout/navBar";
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import Footer from "../layout/footer";

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Organic Waste',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "yellow",
    value: 50,
  },
  {
    id: 2,
    name: 'Plastic Waste',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "red",
    value: 90,
  },
  {
    id: 3,
    name: 'Can',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "green",
    value: 30,
  },
  {
    id: 4,
    name: 'Glass',
    imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
    statusColor: "green",
    value: 10,
  },
  // More products...
];

// Main component
export default function UserManage() {
  // Dummy user data
  const [userDetails, setUserDetails] = useState({
    id: '12345',
    name: 'John Doe',
    location: 'New York',
    tel: '123-456-7890',
  });

  const handleClick = () => {
    toast.success("Sent to admin successfully!");
  };

  // Function to generate user details
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
    <div className="bg-gray-200 min-h-screen" 
    style={{
      //backgroundImage: "url('https://media.istockphoto.com/id/598520904/photo/green-forest-foliage-aerial-view-woodland-tree-canopy-nature-background.jpg?s=612x612&w=0&k=20&c=RcCcRuTBBqnaZ_58Q1o9NGNUxRg-tlPzK_jTjpPIpM4=')", // Add your image URL here
      backgroundSize: "cover", 
      backgroundPosition: "center", 
    }}
    >
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        
        {/* Section to display user details */}
        <div>
          <h2 className="text-2xl font-bold mb-4"></h2>
          {generateUserDetails()}
        </div>

        {/* Section to display product grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden ">
              <div className="aspect-w-1 aspect-h-1 w-full h-64 lg:h-80 ">
                <img
                  src={product.imageSrc}
                  alt={`Image of ${product.name}`}
                  className="w-full h-full object-cover bg-blue-700"
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
      <Footer/>
    </div>
  );
}
