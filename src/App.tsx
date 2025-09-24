import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';

// Gaya untuk Navbar
const navbarStyle = {
  backgroundColor: '#2f855a',
  color: 'white',
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

// Gaya untuk Link di Navbar
const navLinkStyle = {
  padding: '8px 16px',
  margin: '0 8px',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
};

// Gaya untuk Link di Hover
const navLinkHoverStyle = {
  backgroundColor: '#38a169',
};

// Gaya untuk Main Container
const mainContainerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

// Style untuk Button
const buttonStyle = {
  backgroundColor: '#38a169',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

// Gaya untuk Button ketika Hover
const buttonHoverStyle = {
  backgroundColor: '#2f855a',
};

export default function App() {
  return (
    <Router>
      <nav style={navbarStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Palm Oil Fleet Management
        </div>
        <div>
          <Link to="/" style={navLinkStyle}>
            Dashboard
          </Link>
          <Link to="/trips" style={navLinkStyle}>
            Trips
          </Link>
        </div>
      </nav>

      <div style={mainContainerStyle}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
        </Routes>
      </div>
    </Router>
  );
}
