import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTripStats } from '../hooks/useTripStats';

export default function Dashboard() {
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const trips = useSelector((state: RootState) => state.trips.items);

  const { scheduled, completed, pending } = useTripStats(trips);

  // 🔹 Styles
  const container: React.CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const title: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  };

  const card: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '16px',
  };

  const cardTitle: React.CSSProperties = {
    fontWeight: '600',
    marginBottom: '8px',
  };

  const cardValue: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={container}>
      <h1 style={title}>Fleet Dashboard</h1>
      <div style={grid}>
        <div style={card}>
          <h2 style={cardTitle}>Total Vehicles</h2>
          <p style={cardValue}>{vehicles.length}</p>
        </div>
        <div style={card}>
          <h2 style={cardTitle}>Scheduled Trips</h2>
          <p style={cardValue}>{scheduled}</p>
        </div>
        <div style={card}>
          <h2 style={cardTitle}>Completed Trips</h2>
          <p style={cardValue}>{completed}</p>
        </div>
        <div style={card}>
          <h2 style={cardTitle}>Pending Trips</h2>
          <p style={cardValue}>{pending}</p>
        </div>
      </div>
    </div>
  );
}
