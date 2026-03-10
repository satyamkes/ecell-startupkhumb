import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3001";

export function useEventSocket() {
  const socketRef = useRef(null);

  const [activeStartup, setActiveStartup] = useState({
    id: "startup_003",
    name: "EcoGrid Technologies",
    tagline: "Powering Tomorrow's Cities",
    category: "CleanTech",
    founderName: "Priya Sharma",
    pitchOrder: 3,
    totalPitches: 8,
  });
  const [pollOpen, setPollOpen] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalVoters: 0,
    likeIdea: 0,
    likePresentation: 0,
    wouldJoin: 0,
    satisfactionScore: 0,
  });

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    // Receive full state on first connect
    socket.on("initialData", (data) => {
      if (data.activeStartup) setActiveStartup(data.activeStartup);
      if (data.pollOpen !== undefined) setPollOpen(data.pollOpen);
      if (data.liveStats) setLiveStats(data.liveStats);
    });

    // Startup changed (admin updated it)
    socket.on("startupUpdate", (startup) => setActiveStartup(startup));

    // Poll opened / closed by admin
    socket.on("pollStateUpdate", (isOpen) => setPollOpen(isOpen));
    socket.on("statsUpdate", (stats) => setLiveStats(stats));

    return () => {
      socket.disconnect();
    };
  }, []);

  // Call this when the audience user submits their vote
  const submitVote = (voteData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("vote", voteData);
    }
  };

  return {
    activeStartup,
    pollOpen,
    liveStats,
    submitVote,
  };
}
