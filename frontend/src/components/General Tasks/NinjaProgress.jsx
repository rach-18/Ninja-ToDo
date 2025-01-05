"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTask } from "../../context/TaskContext";

function NinjaProgress() {
  const { totalTasks, completedTasks } = useTask();

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const isComplete = completedTasks === totalTasks && totalTasks > 0;
  const [lastCompletedTasks, setLastCompletedTasks] = useState(completedTasks);
  const ninjaControls = useAnimation();
  const audioContext = useRef(null);

  const getNinjaPosition = (progress) => {
    const t = progress / 100;
    const x = t * 90; // Adjust to 90% to leave space for the castle
    const y = 50 * Math.sin(Math.PI * t);
    return { x, y };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    if (completedTasks > lastCompletedTasks) {
      playSound("complete");
      ninjaControls.start({
        y: [-20, 0],
        rotate: [0, 360],
        transition: { duration: 0.5 },
      });
    }
    if (isComplete && completedTasks !== lastCompletedTasks) {
      playSound("victory");
    }
    setLastCompletedTasks(completedTasks);
  }, [completedTasks, lastCompletedTasks, isComplete, ninjaControls]);

  const playSound = (type) => {
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      if (type === "complete") {
        oscillator.frequency.setValueAtTime(
          440,
          audioContext.current.currentTime
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          880,
          audioContext.current.currentTime + 0.1
        );
        gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.current.currentTime + 0.3
        );
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.3);
      } else {
        oscillator.frequency.setValueAtTime(
          440,
          audioContext.current.currentTime
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          880,
          audioContext.current.currentTime + 0.1
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          1320,
          audioContext.current.currentTime + 0.2
        );
        gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.current.currentTime + 0.5
        );
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.5);
      }
    }
  };

  return (
    <div className="relative w-full h-80 mt-8 bg-gradient-to-b from-blue-200 to-green-200 rounded-xl overflow-hidden shadow-lg">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-green-200"></div>

      {/* Sun */}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 bg-yellow-300 rounded-full shadow-lg"
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>

      {/* Clouds */}
      <motion.div
        className="absolute top-8 right-12 w-24 h-8 bg-white rounded-full"
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute top-16 right-24 w-16 h-6 bg-white rounded-full"
        animate={{ x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      ></motion.div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q45,0 90,50"
            fill="url(#groundGradient)"
            stroke="none"
          />
          <defs>
            <linearGradient id="groundGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Castle */}
      <div
        className="absolute right-0 bottom-0 text-6xl"
        style={{ transform: "translateY(10%)" }}
      >
        🏯
      </div>

      {/* Path */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q45,0 90,50"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="pathGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ninja */}
      <motion.div
        className="absolute text-5xl"
        style={{
          left: `${getNinjaPosition(progress).x}%`,
          bottom: `${getNinjaPosition(progress).y}%`,
          transform: "translate(-50%, 50%)",
        }}
        animate={ninjaControls}
      >
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          🥷
        </motion.div>
      </motion.div>

      {/* Progress text */}
      <div className="absolute top-4 left-4 text-sm font-bold text-gray-800 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow">
        {completedTasks} / {totalTasks} tasks completed
      </div>

      {/* Encouragement text */}
      <div className="absolute top-4 right-4 text-sm font-bold text-gray-800 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow">
        {isComplete ? "Mission Accomplished!" : "Keep going, Ninja!"}
      </div>
    </div>
  );
}

export default NinjaProgress;
