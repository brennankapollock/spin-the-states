import React, { useState } from "react";
import MapSection from "./MapSection";
import FilterBar from "./FilterBar";
import ArtistGrid from "./ArtistGrid";

interface HomeProps {
  initialCity?: string;
  googleMapsApiKey?: string;
}

const Home = ({
  initialCity = "Portland, OR",
  googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
}: HomeProps) => {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = (location: string) => {
    setIsLoading(true);
    setSelectedCity(location);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGenreChange = (genre: string) => {
    // Handle genre filter change
    console.log("Genre changed:", genre);
  };

  const handlePopularityChange = (value: number[]) => {
    // Handle popularity filter change
    console.log("Popularity changed:", value);
  };

  const handleEraChange = (era: string) => {
    // Handle era filter change
    console.log("Era changed:", era);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto">
        <MapSection
          onLocationSelect={handleLocationSelect}
          selectedCity={selectedCity}
          isLoading={isLoading}
          googleMapsApiKey={googleMapsApiKey}
        />
        <FilterBar
          onGenreChange={handleGenreChange}
          onPopularityChange={handlePopularityChange}
          onEraChange={handleEraChange}
        />
        <ArtistGrid />
      </main>
    </div>
  );
};

export default Home;
