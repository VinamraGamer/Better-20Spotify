import { useRef, useCallback } from "react";

export function useRipple() {
  const rippleRef = useRef<HTMLElement>(null);

  const createRipple = useCallback((event: React.MouseEvent) => {
    const element = rippleRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 0;
    `;

    // Add ripple animation keyframes if not already added
    if (!document.querySelector("#ripple-style")) {
      const style = document.createElement("style");
      style.id = "ripple-style";
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => {
      if (element.contains(ripple)) {
        element.removeChild(ripple);
      }
    }, 600);
  }, []);

  return { rippleRef, createRipple };
}
