import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}