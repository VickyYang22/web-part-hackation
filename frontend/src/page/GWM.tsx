import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import NavBar from '../layout/navBarAdmin';
import Footer from '../layout/footer';

// Leaflet icon options for eco-friendly markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CAR_SPEED_KPH = 60; // Example speed in kilometers per hour

const generateRandomLocation = (center, range) => {
    const [centerLat, centerLng] = center;
    const randomLat = centerLat + (Math.random() - 0.5) * range;
    const randomLng = centerLng + (Math.random() - 0.5) * range;
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
            name: 'Green Bin',
            imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
            statusColor: ['red', 'green', 'yellow'][Math.floor(Math.random() * 3)],
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
    const distanceKm = distance * 111; // Convert to kilometers (1 degree ≈ 111 km)
    const timeHours = distanceKm / CAR_SPEED_KPH;
    return timeHours * 60; // Convert to minutes
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
    const sampleLocations = generateUniqueLocations(bangkokCenter, 0.05, 4); 

    const [markers, setMarkers] = useState(sampleLocations);
    const [bins, setBins] = useState(sampleLocations);
    const [showInput, setShowInput] = useState(null); 
    const [selectedImage, setSelectedImage] = useState(null);
    const [polylinePoints, setPolylinePoints] = useState([]);

    const carLocation = [13.7563, 100.5018]; //try

    useEffect(() => {
        document.title = 'GWM';
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
    }, [markers]);

    const handleClick1 = () => {
        alert("Rejected!");
    };

    const handleClick2 = () => {
        alert("Accept!");
    };

    return (
        <>
            <NavBar />
            <div className="flex">
                {/* Aside */}
                <aside className="w-1/4 bg-gray-100 p-4">
                    <h2 className="text-xl font-semibold mb-4">Waste Management</h2>
                    <ul>
                        {bins.slice(0, 3).map(bin => (  
                            <li key={bin.id} className="mb-4">
                                <div className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-900">{bin.name}</h3>
                                    <p className="mt-1 text-lg font-bold text-gray-900">{bin.value}%</p>
                                    <div className="flex space-x-4 mt-4">
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                className="text-sm font-bold text-white px-4 py-2 rounded-md"
                                                style={{ backgroundColor: 'red' }} 
                                                onClick={handleClick1}
                                            >
                                                Reject
                                            </button>
                                            <button
                                                className="text-sm font-bold text-white px-4 py-2 rounded-md"
                                                style={{ backgroundColor: 'green' }} 
                                                onClick={handleClick2}
                                            >
                                                Accept
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        ))}
                        <li className="mb-2">
                            <a
                                href="/manage-waste"
                                className="block bg-green-600 text-white p-2 rounded-md shadow-lg hover:bg-green-700 transition-colors duration-300"
                            >
                                Manage Waste
                            </a>
                        </li>
                    </ul>
                </aside>


                {/* Map */}
                <div className="flex-1 px-4 sm:px-10 py-10 bg-green-50">
                    <MapContainer

                        center={bangkokCenter}
                        zoom={11}
                        style={{ height: '500px', width: '100%' }}
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
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        <Marker position={carLocation} />
                        {polylinePoints.length > 1 && (
                            <Polyline positions={polylinePoints} color="blue" weight={4} opacity={0.7} />
                        )}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminManage;
