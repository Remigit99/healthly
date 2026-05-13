import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { MapPin, Store, Navigation } from 'lucide-react';
import { useMapSearch } from '../../hooks/useMapSearch';
import 'leaflet/dist/leaflet.css';

// 1. Create a custom icon for the Parent
const parentIcon = L.divIcon({
  html: renderToString(<div className="p-2 bg-blue-600 rounded-full border-4 border-white shadow-lg text-white"><MapPin size={20} /></div>),
  className: 'custom-div-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// 2. Create a custom icon for Pharmacies/Chemists
const pharmacyIcon = L.divIcon({
  html: renderToString(<div className="p-2 bg-emerald-500 rounded-2xl border-2 border-white shadow-md text-white"><Store size={18} /></div>),
  className: 'custom-div-icon',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const PharmacyPlaces = () => {
  const [userPos, setUserPos] = useState([6.5244, 3.3792]);
  const { results,  fetchPharmacies } = useMapSearch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);
        fetchPharmacies(latitude, longitude);
      },
      () => {
        // Fallback for testing/denial: NYC
        const fallback = [40.7128, -74.0060];
        setUserPos(fallback);
        fetchPharmacies(fallback[0], fallback[1]);
      }
    );
  }, []);

  if (!userPos) return <div className="p-10 text-center font-bold">Initializing Map...</div>;

  return (
    <div className="h-full w-full p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Pharmacy Finder</h1>
        <div className="flex gap-2">
           <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
             <div className="w-2 h-2 rounded-full bg-blue-600" /> You
           </span>
           <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500" /> Pharmacy
           </span>
        </div>
      </div>
      
      <div className="h-150 w-full rounded-4xl overflow-hidden shadow-2xl relative z-0">
        <MapContainer center={userPos} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* PARENT MARKER (BLUE) */}
          <Marker position={userPos} icon={parentIcon}>
            <Popup><span className="font-bold">Your Current Location</span></Popup>
          </Marker>

          {/* PHARMACY MARKERS (EMERALD) */}
          {results.map((p) => {
            if (!p.lat || !p.lon) return null; // Skip if coordinates are missing
            return (
            <Marker 
              key={p.id} 
              position={[p.lat, p.lon]} 
              icon={pharmacyIcon}
            >
              <Popup>
                <div className="min-w-37.5 p-1">
                  <h3 className="font-black text-slate-800 leading-tight mb-1">{p.name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">
                    {p.tags?.shop === 'chemist' ? 'Local Chemist' : 'Pharmacy'}
                  </p>
                  <button className="w-full bg-slate-900 text-white text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-2">
                    <Navigation size={12} /> Directions
                  </button>
                </div>
              </Popup>
            </Marker>
         )})}
        </MapContainer>
      </div>
    </div>
  );
};

export default PharmacyPlaces;