import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Play,
  Heart,
  MoreHorizontal,
  Search,
  Grid3X3,
  List,
  ArrowUpDown,
  Plus,
  Download,
} from "lucide-react";

const libraryItems = [
  {
    id: 1,
    title: "Liked Songs",
    subtitle: "729 songs",
    type: "playlist",
    pinned: true,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Discover Weekly",
    subtitle: "Made for you • Updated Dec 11",
    type: "playlist",
    pinned: true,
    downloaded: true,
    image: "/placeholder.svg",
    color: "from-green-600 to-blue-600",
  },
  {
    id: 3,
    title: "Release Radar",
    subtitle: "Made for you • Updated Dec 11",
    type: "playlist",
    pinned: false,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 4,
    title: "My Playlist #1",
    subtitle: "25 songs",
    type: "playlist",
    pinned: false,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-pink-600 to-red-600",
  },
  {
    id: 5,
    title: "Pop Mix",
    subtitle: "Made for you",
    type: "playlist",
    pinned: false,
    downloaded: true,
    image: "/placeholder.svg",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 6,
    title: "The Weeknd",
    subtitle: "Artist",
    type: "artist",
    pinned: false,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-gray-600 to-red-600",
  },
  {
    id: 7,
    title: "After Hours",
    subtitle: "The Weeknd • 2020",
    type: "album",
    pinned: false,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-red-600 to-black",
  },
  {
    id: 8,
    title: "Daily Mix 1",
    subtitle: "Made for you",
    type: "playlist",
    pinned: false,
    downloaded: false,
    image: "/placeholder.svg",
    color: "from-orange-600 to-red-600",
  },
];

export default function Library() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<
    "all" | "playlists" | "artists" | "albums"
  >("all");

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "playlists" && item.type === "playlist") ||
      (filter === "artists" && item.type === "artist") ||
      (filter === "albums" && item.type === "album");
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Your <span className="text-gradient">Library</span>
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              <Plus className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              {viewMode === "list" ? (
                <Grid3X3 className="w-4 h-4" />
              ) : (
                <List className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant={filter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="text-sm"
          >
            All
          </Button>
          <Button
            variant={filter === "playlists" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("playlists")}
            className="text-sm"
          >
            Playlists
          </Button>
          <Button
            variant={filter === "artists" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("artists")}
            className="text-sm"
          >
            Artists
          </Button>
          <Button
            variant={filter === "albums" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("albums")}
            className="text-sm"
          >
            Albums
          </Button>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-3 w-4 h-4 text-spotify-gray-400" />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-spotify-gray-700 text-white rounded-md border-0 placeholder:text-spotify-gray-400 focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-spotify-gray-400 hover:text-white gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Recently added
          </Button>
        </div>

        {/* Library Items */}
        {viewMode === "list" ? (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 rounded-md hover:bg-spotify-gray-700 group cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded ${item.type === "artist" ? "rounded-full" : "rounded"} flex-shrink-0`}
                  ></div>
                  {item.downloaded && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-spotify-green rounded-full flex items-center justify-center">
                      <Download className="w-2 h-2 text-black" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate flex items-center gap-2">
                    {item.title}
                    {item.pinned && (
                      <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                    )}
                  </div>
                  <div className="text-spotify-gray-400 text-sm truncate">
                    {item.type === "playlist" && "Playlist"} • {item.subtitle}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 p-0 w-10 h-10 text-spotify-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                >
                  <Play className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-spotify-gray-800 hover:bg-spotify-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out group transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative mb-4">
                  <div
                    className={`w-full aspect-square bg-gradient-to-br ${item.color} rounded ${item.type === "artist" ? "rounded-full" : "rounded"} shadow-lg`}
                  ></div>
                  {item.downloaded && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-spotify-green rounded-full flex items-center justify-center">
                      <Download className="w-3 h-3 text-black" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Button>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1 flex items-center gap-2">
                  {item.title}
                  {item.pinned && (
                    <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
                  )}
                </h3>
                <p className="text-spotify-gray-400 text-xs line-clamp-2">
                  {item.type === "playlist" && "Playlist"} • {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-white text-xl font-semibold mb-2">
              No results found
            </h3>
            <p className="text-spotify-gray-400">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
