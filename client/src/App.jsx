import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "./pages/Hero";
import ChatBot from "./components/ChatBot";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0c0c0c]">
        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
