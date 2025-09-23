import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/trips">Trips</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </Router>
  );
}
