import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import NavBar from '../layout/navBarAdmin';

// Leaflet icon options for eco-friendly markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AdminManage = () => {
  const bangkokCenter = [13.7563, 100.5018];

  const sampleLocations = [
    {
      id: 1,
      name: 'Green Bin',
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: "yellow",
      position: [13.8131, 100.5611],
      value: 50,
    },
    {
      id: 2,
      name: 'Green Bin',
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: "red",
      position: [13.7469, 100.4891],
      value: 90,
    },
    {
      id: 3,
      name: 'Green Bin',
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: "green",
      position: [13.7525, 100.4935],
      value: 30,
    },
    {
      id: 4,
      name: 'Green Bin',
      imageSrc: 'https://www.plastor.co.uk/images/detailed/27/Green_360_Litre_Wheelie_Bin.jpg',
      statusColor: "green",
      position: [13.7946, 100.5497],
      value: 30,
    },
  ];

  const [markers, setMarkers] = useState(sampleLocations);

  const addMarker = (e) => {
    const newMarker = {
      id: Date.now(),
      position: [e.latlng.lat, e.latlng.lng],
      name: `Position ${markers.length + 1}`
    };
    setMarkers([...markers, newMarker]);
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
              <Popup>
                <div className="flex items-center space-x-2">
                  <img src={marker.imageSrc} alt={marker.name} className="w-16 h-16 rounded-lg shadow-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">{marker.name}</h3>
                    <p className="text-sm text-gray-600">{marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}</p>
                    <p className="text-sm text-gray-800">Value: {marker.value}%</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default AdminManage;
