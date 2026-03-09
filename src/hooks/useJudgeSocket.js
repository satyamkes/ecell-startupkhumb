import { useState, useEffect } from "react";
// In production: import { io } from "socket.io-client";

export function useJudgeSocket() {
  const [judge, setJudge] = useState(null);  
  const [authError, setAuthError] = useState("");
  const [authLoading,setAuthLoading] = useState(false);
  const [activeStartup,setActiveStartup] = useState({
    id:           "startup_003",
    name:         "EcoGrid Technologies",
    tagline:      "Powering Tomorrow's Cities",
    category:     "CleanTech",
    founderName:  "Priya Sharma",
    pitchOrder:   3,
    totalPitches: 8,
  });
  const [submittedStartups, setSubmittedStartups] = useState(new Set());
  const MOCK_JUDGES = [
    { id: "j1", name: "Dr. Anil Mehta",    email: "anil@dsti-tbi.in",  password: "judge123", designation: "Venture Capitalist",   avatar: "A" },
    { id: "j2", name: "Prof. Sunita Rao",  email: "sunita@nita.ac.in", password: "judge456", designation: "Academic Mentor",       avatar: "S" },
    { id: "j3", name: "Mr. Vikram Bose",   email: "vikram@startup.in", password: "judge789", designation: "Serial Entrepreneur",   avatar: "V" },
  ];

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    await new Promise((r) => setTimeout(r, 900));

    const found = MOCK_JUDGES.find(
      (j) => j.email.toLowerCase() === email.toLowerCase() && j.password === password
    );
    if (found) {
      const { password: _, ...safe } = found;
      setJudge(safe);
    } else {
      setAuthError("Invalid credentials. Please check your email and password.");
    }
    setAuthLoading(false);
  };

  const logout = () => setJudge(null);

  const submitScores = async (startupId, scores, remarks) => {
    // In production: socket.emit("judge:submit", { startupId, judgeId: judge.id, scores, remarks });
    await new Promise((r) => setTimeout(r, 700));
    setSubmittedStartups((prev) => new Set([...prev, startupId]));
    return true;
  };


  
  const hasSubmitted = (startupId) => submittedStartups.has(startupId);
  return {
    judge, authError, authLoading,
    activeStartup,
    login, logout,
    submitScores, hasSubmitted,
  };
}
