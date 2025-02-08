import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";

interface FilterBarProps {
  onGenreChange?: (value: string) => void;
  onPopularityChange?: (value: number[]) => void;
  onEraChange?: (value: string) => void;
  genres?: string[];
  eras?: string[];
}

const FilterBar = ({
  onGenreChange = () => {},
  onPopularityChange = () => {},
  onEraChange = () => {},
  genres = [
    "Rock",
    "Hip Hop",
    "Jazz",
    "Electronic",
    "Folk",
    "Classical",
    "Pop",
    "Blues",
  ],
  eras = [
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2010s",
    "2020s",
  ],
}: FilterBarProps) => {
  return (
    <div className="w-full h-[60px] bg-white border-b flex items-center px-6 gap-8">
      <div className="flex items-center gap-3 min-w-[200px]">
        <Label>Genre</Label>
        <Select onValueChange={onGenreChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre.toLowerCase()}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-[300px]">
        <Label>Popularity</Label>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={onPopularityChange}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3 min-w-[200px]">
        <Label>Era</Label>
        <Select onValueChange={onEraChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select era" />
          </SelectTrigger>
          <SelectContent>
            {eras.map((era) => (
              <SelectItem key={era} value={era.toLowerCase()}>
                {era}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
