import { useState, useEffect } from "react";
// In production: import { io } from "socket.io-client";
export function useEventSocket() {
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
    totalVoters: 142,
    likeIdea: 111,
    likePresentation: 104,
    wouldJoin: 67,
  });

  useEffect(() => {
    const t = setTimeout(() => setPollOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => {
        const tv = prev.totalVoters + Math.floor(Math.random() * 3);
        const li = prev.likeIdea         + (Math.random() > 0.32 ? 1 : 0);
        const lp = prev.likePresentation + (Math.random() > 0.38 ? 1 : 0);
        const wj = prev.wouldJoin        + (Math.random() > 0.52 ? 1 : 0);
        return { totalVoters: tv, likeIdea: li, likePresentation: lp, wouldJoin: wj };
      });
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const satisfactionScore = liveStats.totalVoters > 0
    ? Math.round(
        ((liveStats.likeIdea + liveStats.likePresentation + liveStats.wouldJoin)
          / (liveStats.totalVoters * 3)) * 100
      )
    : 0;

  return {
    activeStartup,
    pollOpen,
    liveStats: { ...liveStats, satisfactionScore },
  };
}
