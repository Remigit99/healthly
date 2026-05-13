import { useState } from 'react';

export const useMapSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPharmacies = async (lat, lon) => {
    setLoading(true);
    // const query = `[out:json];node["amenity"="pharmacy"](around:5000,${lat},${lon});out body;`;

 const query = `
  [out:json][timeout:25];
  (
    node["amenity"~"pharmacy|doctors|clinic|medical"](around:5000,${lat},${lon});
    node["shop"~"chemist|medical_supply|drugstore|pharmacy|medical"](around:5000,${lat},${lon});
    node["healthcare"~"pharmacy|centre|clinic|medical"](around:5000,${lat},${lon});
    way["amenity"~"pharmacy|doctors|clinic|medical"](around:5000,${lat},${lon});
    way["shop"~"chemist|medical_supply|drugstore|pharmacy|medical"](around:5000,${lat},${lon});
  );
  out body center;
`;
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(data.elements);
    setLoading(false);
  };

  return { results, loading, fetchPharmacies };
};