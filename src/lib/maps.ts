import { Loader } from "@googlemaps/js-api-loader";

// US bounds for random location selection
const US_BOUNDS = {
  north: 49.384358, // Northernmost point
  south: 24.396308, // Southernmost point
  east: -66.93457, // Easternmost point
  west: -125.0, // Westernmost point
};

let mapsLoader: Loader | null = null;

export const initGoogleMaps = (apiKey: string) => {
  mapsLoader = new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places"],
  });
  return mapsLoader.load();
};

export const getRandomUSLocation = async (): Promise<{
  lat: number;
  lng: number;
  cityName: string;
}> => {
  if (!mapsLoader) throw new Error("Maps not initialized");

  const google = await mapsLoader.load();
  const geocoder = new google.maps.Geocoder();

  // Generate random coordinates within US bounds
  const lat =
    Math.random() * (US_BOUNDS.north - US_BOUNDS.south) + US_BOUNDS.south;
  const lng =
    Math.random() * (US_BOUNDS.east - US_BOUNDS.west) + US_BOUNDS.west;

  // Get city name from coordinates
  const result = await new Promise<google.maps.GeocoderResult>(
    (resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          resolve(results[0]);
        } else {
          reject(new Error("Geocoding failed"));
        }
      });
    },
  );

  // Extract city and state from address components
  const cityComponent = result.address_components.find((component) =>
    component.types.includes("locality"),
  );
  const stateComponent = result.address_components.find((component) =>
    component.types.includes("administrative_area_level_1"),
  );

  const cityName =
    cityComponent && stateComponent
      ? `${cityComponent.short_name}, ${stateComponent.short_name}`
      : "Unknown Location";

  return { lat, lng, cityName };
};
