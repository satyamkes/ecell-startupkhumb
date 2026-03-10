import "./index.css";
import AudiencePortal from "./components/audience/AudiencePortal";
import JudgePortal from "./components/judge/JudgePortal";

export default function App() {
  const path=window.location.pathname;
  if (path.startsWith("/judge")) return <JudgePortal />;
  return <AudiencePortal />;
}
