import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Package, Bike, CheckCircle2, UtensilsCrossed, Clock } from "lucide-react";

const orderStages = [
  { id: 1, status: "Order placed", icon: CheckCircle2, time: "Now" },
  { id: 2, status: "Cooking started", icon: UtensilsCrossed, time: "2 min" },
  { id: 3, status: "Packaging food", icon: Package, time: "5 min" },
  { id: 4, status: "Rider assigned", icon: Bike, time: "8 min" },
  { id: 5, status: "Arriving in 2 mins", icon: Clock, time: "15 min" },
];

// Bounce animation for the icons
const moveVariants: Variants = {
  active: {
    y: [0, -6, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
  inactive: { y: 0 },
};

// Scale + opacity variants
const iconVariants: Variants = {
  inactive: { scale: 1, opacity: 0.6 },
  active: {
    scale: [1, 1.15, 1],
    opacity: 1,
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
  },
  completed: { scale: 1.05, opacity: 1 },
};

export default function OrderSimulation() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % orderStages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 md:mt-16">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-center text-white/80 text-sm md:text-base font-medium mb-6 uppercase tracking-wide">
          Real-time Order Tracking
        </h3>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-white/20 rounded-full hidden md:block">
            <div
              className="h-full bg-brand-yellow rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(activeStage / (orderStages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Timeline stages */}
          <div className="grid grid-cols-5 gap-4 md:gap-2">
            {orderStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === activeStage;
              const isCompleted = index < activeStage;

              return (
                <div key={stage.id} className="flex flex-col items-center relative">
                  {/* Icon with motion */}
                  <motion.div
                    variants={iconVariants}
                    animate={isActive ? "active" : isCompleted ? "completed" : "inactive"}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 relative z-10 ${
                      isCompleted || isActive
                        ? "bg-brand-yellow text-gray-900"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    <motion.div
                      variants={moveVariants}
                      animate={isActive ? "active" : "inactive"}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7 fill-[#fbcb32]" />
                    </motion.div>
                  </motion.div>

                  {/* Status label */}
                  <div className="text-center">
                    <p
                      className={`text-xs md:text-sm font-medium transition-colors ${
                        isCompleted || isActive ? "text-[#fbcb32]" : "text-white/60"
                      }`}
                    >
                      {stage.status}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{stage.time}</p>
                  </div>

                  {/* Pulse animation for active stage */}
                  {isActive && (
                    <div className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-brand-yellow animate-pulse opacity-30 -top-1 -left-1 md:-left-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile progress indicator */}
          <div className="md:hidden mt-6 bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-brand-yellow transition-all duration-500 ease-out"
              style={{ width: `${(activeStage / (orderStages.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-fade {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.3); }
        }
        .animate-pulse {
          animation: pulse-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
