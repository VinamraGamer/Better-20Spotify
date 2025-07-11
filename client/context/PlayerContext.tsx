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
} | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
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
