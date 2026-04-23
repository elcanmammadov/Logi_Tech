import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { ParkingCircle, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet default marker
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const parkingSpots = [
  { id: 1, name: "Bakı TIR Parking", lat: 40.4093, lng: 49.8671, spots: 45, available: 12 },
  { id: 2, name: "İstanbul Logistics Hub", lat: 41.0082, lng: 28.9784, spots: 120, available: 34 },
  { id: 3, name: "Moskva Cargo Terminal", lat: 55.7558, lng: 37.6173, spots: 80, available: 22 },
  { id: 4, name: "Dubai Freight Zone", lat: 25.2048, lng: 55.2708, spots: 200, available: 67 },
  { id: 5, name: "Hamburg Port Parking", lat: 53.5511, lng: 9.9937, spots: 150, available: 41 },
  { id: 6, name: "Rotterdam Truck Stop", lat: 51.9225, lng: 4.4792, spots: 90, available: 28 },
  { id: 7, name: "Tbilisi Transit Parking", lat: 41.7151, lng: 44.8271, spots: 35, available: 8 },
  { id: 8, name: "Tehran Logistics Park", lat: 35.6892, lng: 51.389, spots: 60, available: 15 },
];

const ParkingMap = () => {
  const [search, setSearch] = useState("");
  const filtered = parkingSpots.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <div className="bg-navy py-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-foreground flex items-center gap-3">
                  <ParkingCircle className="h-8 w-8 text-orange" />
                  Dünya Parking Xəritəsi
                </h1>
                <p className="text-navy-foreground/60 mt-1">
                  TIR sürücüləri üçün parking yerlərini real vaxtda tapın
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="Parking axtar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/40 md:w-64"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 relative" style={{ height: "calc(100vh - 220px)" }}>
          <MapContainer
            center={[41.0, 40.0]}
            zoom={4}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((spot) => (
              <Marker key={spot.id} position={[spot.lat, spot.lng]}>
                <Popup>
                  <div className="font-sans">
                    <h3 className="font-display font-semibold text-sm">{spot.name}</h3>
                    <p className="text-xs mt-1">
                      Ümumi: <strong>{spot.spots}</strong> | Boş:{" "}
                      <strong className="text-green-600">{spot.available}</strong>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Side panel */}
          <div className="absolute top-4 right-4 z-[1000] bg-card/95 backdrop-blur rounded-xl shadow-lg p-4 w-72 max-h-[60vh] overflow-y-auto hidden md:block border">
            <h3 className="font-display font-semibold text-sm text-card-foreground mb-3">
              Parking Yerləri ({filtered.length})
            </h3>
            <div className="space-y-2">
              {filtered.map((spot) => (
                <div
                  key={spot.id}
                  className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange shrink-0" />
                    <span className="text-sm font-medium text-card-foreground truncate">{spot.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 ml-6">
                    {spot.available} / {spot.spots} boş yer
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParkingMap;
