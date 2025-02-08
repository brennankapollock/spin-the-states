import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MapPin, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

interface MapSectionProps {
  onLocationSelect?: (location: string) => void;
  selectedCity?: string;
  isLoading?: boolean;
  googleMapsApiKey?: string;
}

const MapSection = ({
  onLocationSelect = () => {},
  selectedCity = "Portland, OR",
  isLoading = false,
  googleMapsApiKey,
}: MapSectionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use the API key from environment variable directly to ensure it's the latest
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const initMap = async () => {
      const { initGoogleMaps } = await import("@/lib/maps");
      await initGoogleMaps(apiKey);

      const google = window.google;
      mapRef.current = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 39.8283, lng: -98.5795 }, // Center of US
        zoom: 4,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
        ],
        disableDefaultUI: true,
      });

      markerRef.current = new google.maps.Marker({
        map: mapRef.current,
        animation: google.maps.Animation.DROP,
      });
    };

    initMap();
  }, [googleMapsApiKey]);

  const handleRandomLocation = async () => {
    if (!mapRef.current || !markerRef.current) return;

    setIsAnimating(true);
    const { getRandomUSLocation } = await import("@/lib/maps");

    try {
      let validLocation = false;
      let attempts = 0;
      let cityName = "Unknown Location";
      let position = { lat: 0, lng: 0 };

      // Try up to 3 times to get a valid city
      while (!validLocation && attempts < 3) {
        const result = await getRandomUSLocation();
        if (result.cityName !== "Unknown Location") {
          validLocation = true;
          cityName = result.cityName;
          position = { lat: result.lat, lng: result.lng };
        }
        attempts++;
      }

      // Update marker and map position with quick animation
      markerRef.current.setPosition(position);
      mapRef.current.panTo(position);
      mapRef.current.setZoom(8);

      // Update the city name
      onLocationSelect(cityName);
    } catch (error) {
      console.error("Failed to get random location:", error);
      onLocationSelect("Error finding location");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="w-full h-[400px] bg-gray-50 relative overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Selected Location Indicator */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
          opacity: isAnimating ? [0.8, 1, 0.9] : 0.9,
        }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-4 shadow-lg bg-white/90 backdrop-blur">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-semibold">{selectedCity}</span>
          </div>
        </Card>
      </motion.div>

      {/* Random Location Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          size="lg"
          onClick={handleRandomLocation}
          disabled={isLoading}
          className="shadow-lg"
        >
          <Shuffle className="mr-2 h-5 w-5" />
          Random Location
        </Button>
      </div>

      {/* Optional Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
};

export default MapSection;
