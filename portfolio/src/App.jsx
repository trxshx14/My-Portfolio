import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import Portfolio from "./Portfolio";
import AttendMeCaseStudy from "./pages/AttendMeCaseStudy";
import CozyPomodoroCaseStudy from "./pages/CozyPomodoroCaseStudy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/attendme-case-study" element={<AttendMeCaseStudy />} />
        <Route path="/cozy-pomodoro-case-study" element={<CozyPomodoroCaseStudy/>} />
        <Route path="/projects" element={<ProjectsPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}