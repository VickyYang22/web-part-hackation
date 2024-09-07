import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Map } from 'leaflet';
import NavBar from '../layout/navBarAdmin';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css'; 

const bins = [
  { id: 1, name: 'Bin id001', value: 75, statusColor: '#4CAF50' },
  { id: 2, name: 'Bin id002', value: 60, statusColor: '#FF9800' },
  { id: 3, name: 'Bin id003', value: 45, statusColor: '#F44336' },
];

const handleClick = () => {
  toast.success("Success!");
};

const bangkokCenter: LatLngExpression = [13.7563, 100.5018];

export default function NavBarAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [markers, setMarkers] = useState([
    { id: 1, position: [51.505, -0.09] as LatLngExpression, name: "Marker 1", imageUrl: "https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg", value: 80, tel: "+1234567890" },
    { id: 2, position: [51.515, -0.1] as LatLngExpression, name: "Marker 2", imageUrl: "https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg", value: 60, tel: "+0987654321" },
  ]);
  const [showInput, setShowInput] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const mapRef = useRef<Map>(null);

  const addMarker = (e: any) => {
    const name = prompt("Enter bin name:");
    const tel = prompt("Enter telephone number:");
    const newMarker = {
      id: Date.now(),
      position: [e.latlng.lat, e.latlng.lng] as LatLngExpression,
      name: name || `Position ${markers.length + 1}`,
      imageUrl: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      value: 30,
      tel: tel || 'N/A',
    };
    setMarkers([...markers, newMarker]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitImage = () => {
    toast.success("Image submitted!");
    setSelectedImage(null); // Clear the selected image after submission
    setShowInput(null); // Hide input and buttons after submit
  };

  const handleButtonClick = (markerId: number) => {
    setShowInput(markerId); // Show the input for the clicked marker
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', addMarker);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', addMarker);
      }
    };
  }, [mapRef.current, markers]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-xl font-semibold mb-4">Waste Management</h2>
          <ul>
            {bins.map(bin => (
              <li key={bin.id} className="mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900">{bin.name}</h3>
                  <p className="mt-1 text-lg font-bold text-gray-900">{bin.value}%</p>
                  <button
                    className="mt-4 text-sm font-bold text-white px-4 py-2 rounded-md"
                    style={{ backgroundColor: bin.statusColor }}
                    onClick={handleClick}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
            <li className="mb-2">
              <Link
                to="/manage-waste"
                className="block bg-green-600 text-white p-2 rounded-md shadow-lg hover:bg-green-700 transition-colors duration-300"
              >
                Manage Waste
              </Link>
            </li>
          </ul>
        </aside>

        <main className="flex-1">
          <MapContainer
            center={bangkokCenter}
            zoom={13}
            style={{ height: 'calc(100vh - 64px)', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map(marker => (
              <Marker key={marker.id} position={marker.position}>
                <Popup>
                  <div className="flex flex-col items-start space-y-2">
                    <img
                      src={marker.imageUrl}
                      alt={marker.name}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-green-700">{marker.name}</h3>
                    <p className="text-sm text-gray-600">{marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}</p>
                    <p className="text-sm text-gray-800">Value: {marker.value}%</p>
                    <p className="text-sm text-gray-800">Tel: {marker.tel}</p>

                    <div className="flex space-x-4 mt-2">
                      <button
                        className="p-2 bg-red-500 text-white rounded"
                        onClick={() => handleButtonClick(marker.id)}
                      >
                        Red Button
                      </button>
                      <button
                        className="p-2 bg-green-500 text-white rounded"
                        onClick={() => handleButtonClick(marker.id)}
                      >
                        Green Button
                      </button>
                    </div>

                    {showInput === marker.id && (
                      <div className="mt-4">
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="mb-2"
                        />
                        {selectedImage && (
                          <div>
                            <img
                              src={selectedImage}
                              alt="Selected"
                              className="w-32 h-32 object-cover mb-2"
                            />
                            <button
                              className="p-2 bg-blue-500 text-white rounded"
                              onClick={submitImage}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
