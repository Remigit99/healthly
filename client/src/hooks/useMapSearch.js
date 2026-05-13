import { useState } from 'react';

export const useMapSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPharmacies = async (lat, lon) => {
    setLoading(true);
    const query = `[out:json];node["amenity"="pharmacy"](around:5000,${lat},${lon});out body;`;
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(data.elements);
    setLoading(false);
  };

  return { results, loading, fetchPharmacies };
};