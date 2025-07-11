import { Play, Pause } from "lucide-react";
import { Button } from "./button";
import { useRipple } from "@/hooks/use-ripple";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  isPlaying?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PlayButton({
  isPlaying = false,
  onClick,
  className,
  size = "md",
}: PlayButtonProps) {
  const { rippleRef, createRipple } = useRipple();

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e);
    onClick?.(e);
  };

  return (
    <Button
      ref={rippleRef}
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        sizeClasses[size],
        "rounded-full bg-spotify-green text-black hover:bg-spotify-green-hover transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 p-0",
        className,
      )}
    >
      {isPlaying ? (
        <Pause className={cn(iconSizes[size], "fill-current")} />
      ) : (
        <Play className={cn(iconSizes[size], "fill-current")} />
      )}
    </Button>
  );
}
