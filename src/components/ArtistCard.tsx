import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ArtistCardProps {
  name?: string;
  imageUrl?: string;
  genre?: string;
  yearsActive?: string;
  popularity?: number;
  externalLinks?: {
    spotify?: string;
    website?: string;
  };
}

const ArtistCard = ({
  name = "Local Artist Name",
  imageUrl = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop",
  genre = "Alternative Rock",
  yearsActive = "2015 - Present",
  popularity = 75,
  externalLinks = {
    spotify: "https://spotify.com",
    website: "https://example.com",
  },
}: ArtistCardProps) => {
  return (
    <Card className="w-[300px] h-[400px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {genre}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{yearsActive}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${popularity}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">Popularity Score</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          {externalLinks.spotify && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={externalLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open in Spotify</p>
              </TooltipContent>
            </Tooltip>
          )}

          {externalLinks.website && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={externalLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit Website</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
