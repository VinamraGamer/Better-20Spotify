import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Play, Heart, MoreHorizontal, Clock } from "lucide-react";
import { usePlayer, Song } from "../context/PlayerContext";

const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "Jung Kook is on top of the Hottest 50!",
    image: "/placeholder.svg",
    color: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "RapCaviar",
    description: "New music from Drake, Travis Scott and more",
    image: "/placeholder.svg",
    color: "from-green-600 to-teal-600",
  },
  {
    id: 3,
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s",
    image: "/placeholder.svg",
    color: "from-orange-600 to-red-600",
  },
  {
    id: 4,
    title: "Rock Classics",
    description: "Rock legends & epic songs",
    image: "/placeholder.svg",
    color: "from-gray-600 to-gray-800",
  },
  {
    id: 5,
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    image: "/placeholder.svg",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 6,
    title: "Viva Latino",
    description: "Today's top Latin hits",
    image: "/placeholder.svg",
    color: "from-pink-600 to-red-600",
  },
];

const recentlyPlayed = [
  {
    id: 1,
    title: "Liked Songs",
    subtitle: "729 songs",
    image: "/placeholder.svg",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Discover Weekly",
    subtitle: "Your weekly mixtape of fresh music",
    image: "/placeholder.svg",
    color: "from-green-600 to-blue-600",
  },
  {
    id: 3,
    title: "Pop Mix",
    subtitle: "Justin Bieber, Dua Lipa, Taylor Swift and more",
    image: "/placeholder.svg",
    color: "from-pink-600 to-purple-600",
  },
  {
    id: 4,
    title: "Release Radar",
    subtitle: "Catch all the latest music from artists you follow",
    image: "/placeholder.svg",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 5,
    title: "Daily Mix 1",
    subtitle: "The Weeknd, Post Malone, Dua Lipa and more",
    image: "/placeholder.svg",
    color: "from-red-600 to-orange-600",
  },
  {
    id: 6,
    title: "Your Time Capsule",
    subtitle: "Your top songs from 2019",
    image: "/placeholder.svg",
    color: "from-teal-600 to-green-600",
  },
];

export default function Index() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 rounded-full bg-black bg-opacity-70 text-white hover:bg-opacity-80 p-0"
            >
              ←
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 rounded-full bg-black bg-opacity-70 text-white hover:bg-opacity-80 p-0"
            >
              →
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              Upgrade
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 rounded-full bg-black text-white p-0"
            >
              U
            </Button>
          </div>
        </header>

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 17
                ? "afternoon"
                : "evening"}
          </h1>

          {/* Recently Played Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {recentlyPlayed.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-spotify-gray-700 bg-opacity-80 hover:bg-opacity-100 rounded-md flex items-center gap-4 group cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-l-md flex-shrink-0`}
                ></div>
                <div className="flex-1 min-w-0 py-3">
                  <h3 className="font-semibold text-white text-sm truncate">
                    {item.title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 mr-4"
                >
                  <Play className="w-5 h-5 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Made for You */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Made for you</h2>
            <Button
              variant="ghost"
              className="text-spotify-gray-400 hover:text-white text-sm font-semibold"
            >
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {featuredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-spotify-gray-800 hover:bg-spotify-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <div
                    className={`w-full aspect-square bg-gradient-to-br ${playlist.color} rounded-md shadow-lg`}
                  ></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Button>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">
                  {playlist.title}
                </h3>
                <p className="text-spotify-gray-400 text-xs line-clamp-2">
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Recently played</h2>
            <Button
              variant="ghost"
              className="text-spotify-gray-400 hover:text-white text-sm font-semibold"
            >
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentlyPlayed.map((item) => (
              <div
                key={item.id}
                className="bg-spotify-gray-800 hover:bg-spotify-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <div
                    className={`w-full aspect-square bg-gradient-to-br ${item.color} rounded-md shadow-lg`}
                  ></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Button>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-spotify-gray-400 text-xs line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Jump back in */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Jump back in</h2>
            <Button
              variant="ghost"
              className="text-spotify-gray-400 hover:text-white text-sm font-semibold"
            >
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {featuredPlaylists.slice(0, 4).map((playlist) => (
              <div
                key={playlist.id}
                className="bg-spotify-gray-800 hover:bg-spotify-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <div
                    className={`w-full aspect-square bg-gradient-to-br ${playlist.color} rounded-md shadow-lg`}
                  ></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Button>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">
                  {playlist.title}
                </h3>
                <p className="text-spotify-gray-400 text-xs line-clamp-2">
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
