import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useData } from '../context/DataContext';
import { Icon } from 'leaflet';

// Fix for default icon path issue with webpack/vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const MapComponent: React.FC = () => {
  const { state } = useData();
  const { filteredJobs } = state;

  const center: [number, number] = [39.8283, -98.5795];

  if (!filteredJobs || filteredJobs.length === 0) {
      return (
        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee' }}>
            <p>No job data to display on the map.</p>
        </div>
      )
  }

  return (
    <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredJobs.map(job => (
        <Marker
          key={job.id}
          position={[job.location.lat, job.location.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <b>{job.title}</b><br />
            {job.companyName}<br />
            {job.location.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
