import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3001";

export function useJudgeSocket() {
  const socketRef = useRef(null);

  const [judge, setJudge] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeStartup, setActiveStartup] = useState({
    id: "startup_003",
    name: "EcoGrid Technologies",
    tagline: "Powering Tomorrow's Cities",
    category: "CleanTech",
    founderName: "Priya Sharma",
    pitchOrder: 3,
    totalPitches: 8,
  });
  const [submittedStartups, setSubmittedStartups] = useState(new Set());

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("initialData", (data) => {
      if (data.activeStartup) setActiveStartup(data.activeStartup);
    });

    socket.on("startupUpdate", (startup) => setActiveStartup(startup));

    return () => {
      socket.disconnect();
    };
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${SOCKET_URL}/api/judge/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error ?? "Login failed. Please try again.");
      } else {
        setJudge(data.judge);
      }
    } catch {
      setAuthError("Unable to reach the server. Is the backend running?");
    }
    setAuthLoading(false);
  };

  const logout = () => setJudge(null);

  const submitScores = (startupId, scores, remarks) =>
    new Promise((resolve) => {
      const socket = socketRef.current;
      if (!socket?.connected) {
        resolve(false);
        return;
      }
      socket.emit(
        "judge:submit",
        { startupId, judgeId: judge?.id, scores, remarks },
        (ack) => {
          if (ack?.success) {
            setSubmittedStartups((prev) => new Set([...prev, startupId]));
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });

  const hasSubmitted = (startupId) => submittedStartups.has(startupId);

  return {
    judge, authError, authLoading,
    activeStartup,
    login, logout,
    submitScores, hasSubmitted,
  };
}
