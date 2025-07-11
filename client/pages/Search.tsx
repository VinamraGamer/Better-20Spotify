import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Play,
  Heart,
  MoreHorizontal,
  Search as SearchIcon,
} from "lucide-react";
import { usePlayer, Song } from "../context/PlayerContext";

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: "3:53",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Someone Like You",
    artist: "Adele",
    album: "21",
    duration: "4:45",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    image: "/placeholder.svg",
  },
  {
    id: "7",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3",
    duration: "2:21",
    image: "/placeholder.svg",
  },
  {
    id: "8",
    title: "Industry Baby",
    artist: "Lil Nas X, Jack Harlow",
    album: "MONTERO",
    duration: "3:32",
    image: "/placeholder.svg",
  },
];

const browseCategories = [
  { id: 1, title: "Pop", color: "bg-pink-500", image: "/placeholder.svg" },
  { id: 2, title: "Hip-Hop", color: "bg-red-500", image: "/placeholder.svg" },
  { id: 3, title: "Rock", color: "bg-orange-500", image: "/placeholder.svg" },
  { id: 4, title: "Latin", color: "bg-yellow-500", image: "/placeholder.svg" },
  {
    id: 5,
    title: "Electronic",
    color: "bg-green-500",
    image: "/placeholder.svg",
  },
  { id: 6, title: "Country", color: "bg-blue-500", image: "/placeholder.svg" },
  { id: 7, title: "R&B", color: "bg-purple-500", image: "/placeholder.svg" },
  { id: 8, title: "Indie", color: "bg-indigo-500", image: "/placeholder.svg" },
  { id: 9, title: "Jazz", color: "bg-teal-500", image: "/placeholder.svg" },
  {
    id: 10,
    title: "Classical",
    color: "bg-gray-500",
    image: "/placeholder.svg",
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { dispatch } = usePlayer();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // Simulate API delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      const results = mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()) ||
          song.album.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handlePlaySong = (song: Song) => {
    dispatch({ type: "PLAY_SONG", payload: song });
    dispatch({ type: "SET_QUEUE", payload: mockSongs });
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Search Input */}
        <div className="mb-12 relative z-10">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-spotify-gray-400" />
            <Input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 bg-white text-black border-0 placeholder:text-gray-500 focus:ring-2 focus:ring-spotify-green transition-all duration-300 ease-in-out focus:scale-105 shadow-modern hover:shadow-glow rounded-xl text-lg font-medium"
            />
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <LoadingSpinner size="md" />
              <span className="text-spotify-gray-400">Searching...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isSearching && searchResults.length > 0 && (
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">
              Songs
            </h2>
            <div className="space-y-2">
              {searchResults.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaySong(song)}
                  className="flex items-center gap-4 p-4 rounded-xl glass backdrop-blur-xl group cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-modern hover:shadow-glow border border-white border-opacity-5 hover:border-opacity-20"
                >
                  <div className="w-8 text-spotify-gray-400 text-sm">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-spotify-gray-600 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {song.title}
                    </div>
                    <div className="text-spotify-gray-400 text-sm truncate">
                      {song.artist}
                    </div>
                  </div>
                  <div className="hidden md:block text-spotify-gray-400 text-sm truncate max-w-32">
                    {song.album}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 p-0 w-8 h-8 text-spotify-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add like functionality here
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <div className="text-spotify-gray-400 text-sm w-12 text-right">
                    {song.duration}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse All */}
        {!searchQuery && !isSearching && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {browseCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} rounded-lg p-4 aspect-square cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden transform hover:shadow-2xl hover:brightness-110`}
                >
                  <h3 className="text-white font-bold text-lg mb-2">
                    {category.title}
                  </h3>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-black bg-opacity-20 rounded-full transform rotate-12"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && !isSearching && searchResults.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-white text-xl font-semibold mb-2">
              No results found for "{searchQuery}"
            </h3>
            <p className="text-spotify-gray-400">
              Please make sure your words are spelled correctly, or use fewer or
              different keywords.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
