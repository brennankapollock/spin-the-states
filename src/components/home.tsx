import React, { useState } from "react";
import MapSection from "./MapSection";
import FlipText from "./FlipText";
import ArtistGrid from "./ArtistGrid";

interface HomeProps {
  initialCity?: string;
  googleMapsApiKey?: string;
}

const Home = ({
  initialCity = "Portland, OR",
  googleMapsApiKey, // Remove default value to avoid stale API key
}: HomeProps) => {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = async (location: string) => {
    setIsLoading(true);
    setSelectedCity(location);

    // Here you would typically fetch artists data for the new location
    // For now we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
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
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 grid grid-rows-2">
        <MapSection
          onLocationSelect={handleLocationSelect}
          selectedCity={selectedCity}
          isLoading={isLoading}
          googleMapsApiKey={googleMapsApiKey}
        />
        <div className="bg-background flex items-center justify-center">
          <div className="text-7xl font-black tracking-tight">
            <FlipText text={selectedCity} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
