import { Bike } from "lucide-react";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  const text = "...";
  const characters = text.split("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#fbcb32" }}>
      <div className="text-center">
        {/* Main loading text with jumping characters */}
        <div className="flex items-center justify-center gap-1 mb-12">
          {characters.map((char, index) => (
            <span
              key={index}
              className="inline-block font-heading text-5xl md:text-7xl font-bold transition-transform"
              style={{
                color: "#077a69",
                animation: `jump 0.6s ease-in-out infinite`,
                animationDelay: `${index * 0.08}s`,
                fontFamily: "Rubik, sans-serif",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}

          {/* Moving rider icon */}
          <div
            className="inline-flex items-center ml-4"
            style={{
              animation: `moveRight 2s ease-in-out infinite`,
            }}
          >
            <Bike className="w-12 h-12 md:w-16 md:h-16" style={{ color: "#077a69" }} />
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={{
                backgroundColor: "#077a69",
                animation: `bounce 1.4s infinite`,
                animationDelay: `${dot * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.9;
          }
        }

        @keyframes moveRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
