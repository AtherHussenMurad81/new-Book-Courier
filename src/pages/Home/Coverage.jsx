// src/components/Home/Coverage.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Component to programmatically move the map
const MapUpdater = ({ target }) => {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo(target, 12); // Zoom to target
    }
  }, [target, map]);

  return null;
};

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [target, setTarget] = useState(null);
  const position = [23.685, 90.3563]; // Bangladesh center

  // Load JSON data from public folder
  useEffect(() => {
    axios
      .get("/area.json") // <-- Corrected file name
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServiceCenters(res.data);
        } else if (res.data && Array.isArray(res.data.serviceCenters)) {
          setServiceCenters(res.data.serviceCenters);
        } else {
          console.error("Coverage data is not an array!", res.data);
        }
      })
      .catch((err) => console.error("Failed to load coverage data:", err));
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim().toLowerCase();

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location)
    );

    if (district) {
      setTarget([district.latitude, district.longitude]);
    } else {
      alert("District not found!");
    }
  };

  return (
    <section className="py-16 bg-gray-100 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        📍 Delivery Coverage
      </h2>
      <p className="text-center mb-8">
        We deliver books to major cities across Bangladesh
      </p>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            name="location"
            placeholder="Search district..."
            className="input input-bordered w-64"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Map */}
      <div className="border w-full h-[600px] rounded-xl shadow-lg">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[600px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Areas: {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}

          {/* Move map when search target changes */}
          <MapUpdater target={target} />
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
