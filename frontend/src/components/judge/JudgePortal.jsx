import { useJudgeSocket } from "../../hooks/useJudgeSocket";
import JudgeLoginScreen from "./JudgeLoginScreen";
import JudgeDashboard   from "./JudgeDashboard";


export default function JudgePortal() {
  const {
    judge, authError, authLoading,
    activeStartup,
    login, logout,
    submitScores, hasSubmitted,
  } = useJudgeSocket();

  if (!judge) {
    return (
      <JudgeLoginScreen
        onLogin={login}
        authError={authError}
        authLoading={authLoading}
      />
    );
  }

  return (
    <JudgeDashboard
      judge={judge}
      startup={activeStartup}
      onSubmit={submitScores}
      onLogout={logout}
      alreadySubmitted={hasSubmitted(activeStartup.id)}
    />
  );
}
