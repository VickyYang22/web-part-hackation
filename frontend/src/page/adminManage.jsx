import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import NavBar from '../layout/navBarAdmin';
import Footer from '../layout/footer';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',

  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CAR_SPEED_KPH = 60; 

const generateRandomLocation = (center, range) => {
  const [centerLat, centerLng] = center;
  const randomLat = centerLat + (Math.random() - 0.5) * range   ;
  const randomLng = centerLng + (Math.random() - 0.5) * range ;
  return [parseFloat(randomLat.toFixed(4)), parseFloat(randomLng.toFixed(4))];
};

const generateUniqueLocations = (center, range, count) => {
  const locations = new Set();
  while (locations.size < count) {
    locations.add(generateRandomLocation(center, range).toString());
  }
  return Array.from(locations).map((loc, index) => {
    const [lat, lng] = loc.split(',').map(Number);
    return {
      id: index + 1,
      name: `${['Organic Waste', 'Plastic Waste', 'Can', 'Glass'][Math.floor(Math.random() * 4)]} bin`,
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: ['blue', 'green', 'red', 'yellow'][Math.floor(Math.random() * 4)],
      position: [lat, lng],
      value: Math.floor(Math.random() * 100),
      tel: `123-456-${String(index + 1000).padStart(4, '0')}`
    };
    
  });
};

const calculateDistance = (latlng1, latlng2) => {
  const [lat1, lng1] = latlng1;
  const [lat2, lng2] = latlng2;


  return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2);
};

const calculateTimeToArrive = (currentLocation, destinationLocation) => {
  const distance = calculateDistance(currentLocation, destinationLocation);
  const distanceKm = distance * 111; // Convert to kilometers 1 degree ≈ 111 km
const timeHours = distanceKm / CAR_SPEED_KPH;
  return timeHours * 60; // to m inutes
};

const findClosestLocation = (currentLocation, locations) => {
  let closest = null;
  let minDistance = Infinity;

  locations.forEach(location => {
    const distance = calculateDistance(currentLocation, location.position);
    if (distance < minDistance) {
      minDistance = distance;
      closest = location;
    }
  });

  return closest;
};

const AdminManage = () => {
  const bangkokCenter = [13.7563, 100.5018];
  const sampleLocations = generateUniqueLocations(bangkokCenter, 0.05, 4); // Change count to 4

  const [markers, setMarkers] = useState(sampleLocations);
  const [showInput, setShowInput] = useState(null); // Track which marker's input is visible
  const [selectedImage, setSelectedImage] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  
  // Define a single car marker location
  const carLocation = [13.7563, 100.5018]; // Example location for the car marker

  useEffect(() => {
    document.title = 'AdminManage';
    
    const allMarkers = [...markers];
    const points = [carLocation];
    const arrivalTimes = [];
    let currentLocation = carLocation;

    while (allMarkers.length > 0) {
      const closest = findClosestLocation(currentLocation, allMarkers);
      const timeToArrive = calculateTimeToArrive(currentLocation, closest.position);
      arrivalTimes.push({ id: closest.id, time: timeToArrive });
      points.push(closest.position);
      currentLocation = closest.position;
      allMarkers.splice(allMarkers.indexOf(closest), 1); // Remove the visited marker
    }

    setPolylinePoints(points);
    // Optionally, you can set the arrival times in a state if you need to use them elsewhere
    // setArrivalTimes(arrivalTimes);
  }, [markers]);

  const addMarker = (e) => {
    const name = prompt("Enter bin name:");
    const tel = prompt("Enter telephone number:");
    const newMarker = {
      id: Date.now(),
      position: [e.latlng.lat, e.latlng.lng],
      name: name || `Position ${markers.length + 1}`,
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: "green",
      value: 30,
      tel: tel || 'N/A',
    };
    setMarkers([...markers, newMarker]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitImage = () => {
    alert("Image submitted!");
    setSelectedImage(null); // Clear the selected image after submission
    setShowInput(null); // Hide input and buttons after submit
  };

  const handleButtonClick = (color, markerId) => {
    setShowInput(markerId); // Show the input for the clicked marker
  };

  return (
    <>
      <NavBar />
      <div className="px-4 sm:px-10 py-10 bg-green-50">
        <MapContainer
          center={bangkokCenter}
          zoom={11}
          style={{ height: '500px', width: '100%' }}
          onClick={addMarker}
          zoomControl={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup maxWidth={400}>
                <div className="flex flex-col items-start space-y-2">
                  <img
                    src={marker.imageSrc}
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
                      onClick={() => handleButtonClick('red', marker.id)}
                    >
                      Red Button
                    </button>
                    <button
                      className="p-2 bg-green-500 text-white rounded"
                      onClick={() => handleButtonClick('green', marker.id)}
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


          <Marker
            position={carLocation}
            icon={L.icon({
              iconUrl: 'https://www.clipartmax.com/png/full/196-1961098_car-navigation-maps-for-lovers-of-long-distance-road-google-map-car.png', // Replace with your car icon URL
              iconSize: [55, 45], 
            })}
          >
            <Popup>
              <div className="text-sm text-gray-800">
                Car Location: {carLocation[0].toFixed(4)}, {carLocation[1].toFixed(4)}
              </div>
              {markers.map(marker => {
                const timeToArrive = calculateTimeToArrive(carLocation, marker.position);
                return (
                  <div key={marker.id}>
                    <p>Bin {marker.name}: {timeToArrive.toFixed(0)} minutes</p>
                  </div>
                );
              })}
            </Popup>
          </Marker>

          {/*polyline */}
          {polylinePoints.length > 1 && (
            <Polyline
              positions={polylinePoints}
              color="blue"
              weight={4}
              opacity={0.7}
            />
          )}
        </MapContainer>
      </div>
      <Footer />
    </>
  );
};

export default AdminManage;
