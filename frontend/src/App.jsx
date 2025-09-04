import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInStaff from "./Pages/LogInPages/LogInStaff.jsx";
import RegisterStaff from "./Pages/RegisterPages/RegisterStaff.jsx";
import LogInPatient from "./Pages/LogInPages/LogInpatient.jsx";
import RegisterPatient from "./Pages/RegisterPages/RegisterPatien.jsx";

function App() {

  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/LogIn/Staff" element={<LogInStaff/>} />
            <Route path="/Register/Staff" element={<RegisterStaff/>} />
            <Route path="/LogIn/Patient" element={<LogInPatient/>} />
            <Route path="/Register/Patient" element={<RegisterPatient/>} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
