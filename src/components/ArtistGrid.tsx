import React from "react";
import ArtistCard from "./ArtistCard";

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre: string;
  yearsActive: string;
  popularity: number;
  externalLinks: {
    spotify?: string;
    website?: string;
  };
}

interface ArtistGridProps {
  artists?: Artist[];
}

const ArtistGrid = ({
  artists = [
    {
      id: "1",
      name: "The Local Band",
      imageUrl:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop",
      genre: "Indie Rock",
      yearsActive: "2018 - Present",
      popularity: 85,
      externalLinks: {
        spotify: "https://spotify.com",
        website: "https://example.com",
      },
    },
    {
      id: "2",
      name: "City Lights",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Electronic",
      yearsActive: "2015 - Present",
      popularity: 72,
      externalLinks: {
        spotify: "https://spotify.com",
      },
    },
    {
      id: "3",
      name: "Street Corner Jazz",
      imageUrl:
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop",
      genre: "Jazz",
      yearsActive: "2012 - Present",
      popularity: 65,
      externalLinks: {
        website: "https://example.com",
      },
    },
  ],
}: ArtistGridProps) => {
  return (
    <div className="w-full min-h-[522px] bg-gray-50 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            imageUrl={artist.imageUrl}
            genre={artist.genre}
            yearsActive={artist.yearsActive}
            popularity={artist.popularity}
            externalLinks={artist.externalLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistGrid;
