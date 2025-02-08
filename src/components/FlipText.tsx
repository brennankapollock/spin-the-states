import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlipTextProps {
  text: string;
}

const FlipText = ({ text }: FlipTextProps) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <AnimatePresence mode="wait">
        {text.split("").map((char, index) => (
          <motion.span
            key={index + char}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              damping: 10,
            }}
            className="inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FlipText;
