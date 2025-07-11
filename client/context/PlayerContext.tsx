import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useEffect,
} from "react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  audioUrl: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  isLoading: boolean;
  error: string | null;
}

type PlayerAction =
  | { type: "PLAY_SONG"; payload: Song }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "NEXT_SONG" }
  | { type: "PREVIOUS_SONG" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" }
  | { type: "SET_QUEUE"; payload: Song[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: PlayerState = {
  currentSong: {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    image: "/placeholder.svg",
    audioUrl: "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3", // Sample audio
  },
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  volume: 50,
  queue: [],
  isShuffled: false,
  repeatMode: "off",
  isLoading: false,
  error: null,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "PLAY_SONG":
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: true,
        isLoading: true,
        error: null,
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    case "SET_CURRENT_TIME":
      return {
        ...state,
        currentTime: action.payload,
        progress:
          state.duration > 0 ? (action.payload / state.duration) * 100 : 0,
      };
    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
        isLoading: false,
      };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.payload,
      };
    case "NEXT_SONG":
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(
          (song) => song.id === state.currentSong?.id,
        );
        const nextIndex = (currentIndex + 1) % state.queue.length;
        return {
          ...state,
          currentSong: state.queue[nextIndex],
          isPlaying: true,
          isLoading: true,
        };
      }
      return state;
    case "PREVIOUS_SONG":
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(
          (song) => song.id === state.currentSong?.id,
        );
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : state.queue.length - 1;
        return {
          ...state,
          currentSong: state.queue[prevIndex],
          isPlaying: true,
          isLoading: true,
        };
      }
      return state;
    case "TOGGLE_SHUFFLE":
      return {
        ...state,
        isShuffled: !state.isShuffled,
      };
    case "TOGGLE_REPEAT":
      const repeatModes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
      const currentIndex = repeatModes.indexOf(state.repeatMode);
      const nextIndex = (currentIndex + 1) % repeatModes.length;
      return {
        ...state,
        repeatMode: repeatModes[nextIndex],
      };
    case "SET_QUEUE":
      return {
        ...state,
        queue: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

const PlayerContext = createContext<{
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  audioRef: React.RefObject<HTMLAudioElement>;
} | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
    };

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_CURRENT_TIME", payload: audio.currentTime });
    };

    const handleEnded = () => {
      if (state.repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: "NEXT_SONG" });
      }
    };

    const handleError = () => {
      dispatch({ type: "SET_ERROR", payload: "Failed to load audio" });
    };

    const handleCanPlay = () => {
      dispatch({ type: "SET_LOADING", payload: false });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [state.repeatMode]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.play().catch(() => {
        dispatch({ type: "SET_ERROR", payload: "Failed to play audio" });
      });
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  // Handle song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;

    audio.src = state.currentSong.audioUrl;
    audio.load();

    if (state.isPlaying) {
      audio.play().catch(() => {
        dispatch({ type: "SET_ERROR", payload: "Failed to play audio" });
      });
    }
  }, [state.currentSong?.id]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = state.volume / 100;
  }, [state.volume]);

  return (
    <PlayerContext.Provider value={{ state, dispatch, audioRef }}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

// Helper function to format time
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
