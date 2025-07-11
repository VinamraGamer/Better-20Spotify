import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Library,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "../context/PlayerContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: playerState, dispatch } = usePlayer();

  const isActive = (path: string) => location.pathname === path;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 bg-spotify-gray-900 border-t border-spotify-gray-600 z-10">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center gap-1 ${
              isActive("/") ? "text-white" : "text-spotify-gray-400"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate("/search")}
            className={`flex flex-col items-center gap-1 ${
              isActive("/search") ? "text-white" : "text-spotify-gray-400"
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button
            onClick={() => navigate("/library")}
            className={`flex flex-col items-center gap-1 ${
              isActive("/library") ? "text-white" : "text-spotify-gray-400"
            }`}
          >
            <Library className="w-6 h-6" />
            <span className="text-xs">Your Library</span>
          </button>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 bg-black flex-col">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-black fill-current" />
              </div>
              <span className="text-xl font-bold">Spotify</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="px-3 space-y-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className={`w-full justify-start gap-4 h-10 px-3 ${
                isActive("/")
                  ? "text-white bg-spotify-gray-700"
                  : "text-spotify-gray-300 hover:text-white"
              }`}
            >
              <Home className="w-6 h-6" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/search")}
              className={`w-full justify-start gap-4 h-10 px-3 ${
                isActive("/search")
                  ? "text-white bg-spotify-gray-700"
                  : "text-spotify-gray-300 hover:text-white"
              }`}
            >
              <Search className="w-6 h-6" />
              Search
            </Button>
          </nav>

          {/* Library Section */}
          <div className="mt-6 px-3">
            <div className="flex items-center justify-between mb-4 px-3">
              <Button
                variant="ghost"
                onClick={() => navigate("/library")}
                className={`justify-start gap-4 h-10 px-0 ${
                  isActive("/library")
                    ? "text-white"
                    : "text-spotify-gray-300 hover:text-white"
                }`}
              >
                <Library className="w-6 h-6" />
                Your Library
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-spotify-gray-300 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Access */}
            <div className="space-y-2 mb-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-spotify-gray-300 hover:text-white h-10 px-3"
              >
                <Heart className="w-6 h-6" />
                Liked Songs
              </Button>
            </div>

            {/* Playlists */}
            <div className="space-y-1 overflow-y-auto max-h-64">
              {[
                "Recently Played",
                "Made For You",
                "Discover Weekly",
                "Release Radar",
                "Chill Hits",
                "Pop Mix",
                "Rock Classics",
                "Jazz Vibes",
              ].map((playlist) => (
                <button
                  key={playlist}
                  className="w-full text-left px-3 py-2 text-sm text-spotify-gray-300 hover:text-white rounded transition-colors"
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-b from-spotify-gray-900 to-spotify-dark-gray overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden sticky top-0 bg-spotify-gray-900 bg-opacity-90 backdrop-blur-md z-10 p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-black fill-current" />
              </div>
              <span className="text-xl font-bold">Spotify</span>
            </div>
          </div>
          <div className="pb-32 md:pb-0">{children}</div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="h-20 bg-spotify-gray-800 border-t border-spotify-gray-600 flex items-center px-4">
        {/* Currently Playing */}
        <div className="flex items-center gap-4 w-80 min-w-0">
          <div className="w-14 h-14 bg-spotify-gray-600 rounded flex-shrink-0"></div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">
              Song Title
            </div>
            <div className="text-xs text-spotify-gray-400 truncate">
              Artist Name
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 w-6 h-6 text-spotify-gray-400 hover:text-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center gap-2 px-2 sm:px-8">
          {/* Control Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:block p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 w-10 h-10 bg-white text-black hover:bg-gray-200 rounded-full"
            >
              <Play className="w-5 h-5 fill-current" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:block p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="hidden sm:block text-xs text-spotify-gray-400 w-10 text-right">
              0:00
            </span>
            <Slider defaultValue={[30]} max={100} step={1} className="flex-1" />
            <span className="hidden sm:block text-xs text-spotify-gray-400 w-10">
              3:45
            </span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="hidden lg:flex items-center gap-2 w-80 justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
          >
            <Mic2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
          >
            <ListMusic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white"
          >
            <MonitorSpeaker className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-spotify-gray-400" />
            <Slider defaultValue={[50]} max={100} step={1} className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
