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
      <div className="md:hidden fixed bottom-20 left-0 right-0 glass-dark backdrop-blur-2xl z-10 border-t border-white border-opacity-10">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 ${
              isActive("/") ? "text-white" : "text-spotify-gray-400"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate("/search")}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 ${
              isActive("/search") ? "text-white" : "text-spotify-gray-400"
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button
            onClick={() => navigate("/library")}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 ${
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
        <div className="hidden md:flex w-64 bg-gradient-to-b from-spotify-black to-spotify-gray-900 flex-col transition-all duration-300 ease-in-out border-r border-spotify-gray-800">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-light rounded-full flex items-center justify-center shadow-glow">
                <Play className="w-5 h-5 text-black fill-current" />
              </div>
              <span className="text-2xl font-bold text-gradient">Spotify</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="px-3 space-y-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className={`w-full justify-start gap-4 h-12 px-4 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl ${
                isActive("/")
                  ? "text-white bg-gradient-to-r from-spotify-green to-spotify-green-light shadow-glow text-black font-bold"
                  : "text-spotify-gray-300 hover:text-white glass hover:border-opacity-20"
              }`}
            >
              <Home className="w-6 h-6" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/search")}
              className={`w-full justify-start gap-4 h-12 px-4 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl ${
                isActive("/search")
                  ? "text-white bg-gradient-to-r from-spotify-green to-spotify-green-light shadow-glow text-black font-bold"
                  : "text-spotify-gray-300 hover:text-white glass hover:border-opacity-20"
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
                className={`justify-start gap-4 h-12 px-4 transition-all duration-300 ease-in-out rounded-xl ${
                  isActive("/library")
                    ? "text-white bg-gradient-to-r from-spotify-green to-spotify-green-light shadow-glow text-black font-bold"
                    : "text-spotify-gray-300 hover:text-white glass hover:border-opacity-20"
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
                  className="w-full text-left px-4 py-3 text-sm text-spotify-gray-300 hover:text-white rounded-xl transition-all duration-300 ease-in-out glass hover:border-opacity-20 transform hover:translate-x-2 hover:scale-105 font-medium"
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-dark overflow-y-auto relative">
          {/* Dynamic gradient overlay */}
          <div className="absolute inset-0 bg-animated-gradient opacity-5 pointer-events-none"></div>
          {/* Floating orbs for visual depth */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-spotify-green opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          {/* Mobile Header */}
          <div className="md:hidden sticky top-0 glass-dark backdrop-blur-2xl z-10 p-4 border-b border-white border-opacity-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-spotify-green-light rounded-full flex items-center justify-center shadow-glow">
                <Play className="w-4 h-4 text-black fill-current" />
              </div>
              <span className="text-xl font-bold text-gradient">Spotify</span>
            </div>
          </div>
          <div className="pb-32 md:pb-0">{children}</div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="h-20 glass-dark backdrop-blur-2xl border-t border-white border-opacity-10 flex items-center px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-spotify-green to-spotify-green-light opacity-5"></div>
        {/* Currently Playing */}
        <div className="flex items-center gap-4 w-80 min-w-0 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-spotify-gray-600 to-spotify-gray-700 rounded-lg flex-shrink-0 shadow-modern border border-white border-opacity-10"></div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {playerState.currentSong?.title || "No song playing"}
            </div>
            <div className="text-xs text-spotify-gray-400 truncate">
              {playerState.currentSong?.artist || ""}
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
        <div className="flex-1 flex flex-col items-center gap-2 px-2 sm:px-8 relative z-10">
          {/* Control Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_SHUFFLE" })}
              className={`hidden sm:block p-0 w-10 h-10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
                playerState.isShuffled
                  ? "text-spotify-green bg-spotify-green bg-opacity-20 shadow-glow"
                  : "text-spotify-gray-400 hover:text-white glass"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "PREVIOUS_SONG" })}
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_PLAY" })}
              className="p-0 w-12 h-12 bg-gradient-to-br from-white to-gray-100 text-black hover:from-gray-100 hover:to-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-115 active:scale-95 shadow-glow hover:shadow-xl border-2 border-white border-opacity-20"
            >
              {playerState.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "NEXT_SONG" })}
              className="p-0 w-8 h-8 text-spotify-gray-400 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_REPEAT" })}
              className={`hidden sm:block p-0 w-10 h-10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
                playerState.repeatMode !== "off"
                  ? "text-spotify-green bg-spotify-green bg-opacity-20 shadow-glow"
                  : "text-spotify-gray-400 hover:text-white glass"
              }`}
            >
              <Repeat className="w-4 h-4" />
              {playerState.repeatMode === "one" && (
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-spotify-green rounded-full"></div>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="hidden sm:block text-xs text-spotify-gray-400 w-10 text-right">
              {formatTime(Math.floor((playerState.progress / 100) * 225))}
            </span>
            <Slider
              value={[playerState.progress]}
              onValueChange={(value) =>
                dispatch({ type: "SET_PROGRESS", payload: value[0] })
              }
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="hidden sm:block text-xs text-spotify-gray-400 w-10">
              {playerState.currentSong?.duration || "0:00"}
            </span>
          </div>
        </div>

        {/* Volume and Additional Controls */}
        <div className="hidden lg:flex items-center gap-2 w-80 justify-end relative z-10">
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
            <Slider
              value={[playerState.volume]}
              onValueChange={(value) =>
                dispatch({ type: "SET_VOLUME", payload: value[0] })
              }
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
