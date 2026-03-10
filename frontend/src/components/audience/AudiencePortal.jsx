import { useState } from "react";
import { useEventSocket } from "../../hooks/useEventSocket";
import LandingScreen from "./LandingScreen";
import WatchingScreen from "./WatchingScreen";
import VotingScreen from "./VotingScreen";
import SubmittedScreen from "./SubmittedScreen";

/**
 * AudiencePortal
 * Root component that owns screen-state and wires up the socket hook.
 *
 * Screen flow:
 *   landing → watching → voting → submitted
 *
 * Socket events that drive transitions:
 *   startup:changed  → update activeStartup (all screens)
 *   poll:opened      → WatchingScreen → VotingScreen
 *   vote:updated     → update liveStats (all screens)
 */
export default function AudiencePortal() {
  const [screen, setScreen] = useState("landing");
  const [userName, setUserName] = useState("");
  const [votes, setVotes] = useState(null);

  const { activeStartup, pollOpen, liveStats, submitVote } = useEventSocket();

  const handleJoin = (name) => { setUserName(name); setScreen("watching"); };
  const handleSubmit = (v) => {
    submitVote(v);
    setVotes(v);
    setScreen("submitted");
  };

  return (
    <>
      {screen === "landing" && (
        <LandingScreen
          liveStats={liveStats}
          onJoin={handleJoin}
        />
      )}

      {screen === "watching" && (
        <WatchingScreen
          startup={activeStartup}
          userName={userName}
          pollOpen={pollOpen}
          liveStats={liveStats}
          onPollReady={() => setScreen("voting")}
        />
      )}

      {screen === "voting" && (
        <VotingScreen
          startup={activeStartup}
          userName={userName}
          liveStats={liveStats}
          onSubmit={handleSubmit}
        />
      )}

      {screen === "submitted" && (
        <SubmittedScreen
          startup={activeStartup}
          votes={votes}
          liveStats={liveStats}
        />
      )}
    </>
  );
}
