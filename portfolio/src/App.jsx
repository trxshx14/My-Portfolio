import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import Portfolio from "./Portfolio";
import NotFound from "./NotFound";
import AttendMeCaseStudy from "./pages/AttendMeCaseStudy";
import CozyPomodoroCaseStudy from "./pages/CozyPomodoroCaseStudy";
import AuraBeautyCaseStudy from "./pages/AuraBeautyCaseStudy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/attendme-case-study" element={<AttendMeCaseStudy />} />
        <Route path="/cozy-pomodoro-case-study" element={<CozyPomodoroCaseStudy />} />
        <Route path="/aura-beauty-case-study" element={<AuraBeautyCaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}