import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import AttendMeCaseStudy from "./pages/AttendMeCaseStudy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/attendme-case-study" element={<AttendMeCaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}