import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTripStats } from '../hooks/useTripStats';

export default function Dashboard() {
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const trips = useSelector((state: RootState) => state.trips.items);

  const { scheduled, completed, pending } = useTripStats(trips);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fleet Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Total Vehicles</h2>
          <p>{vehicles.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Scheduled Trips</h2>
          <p>{scheduled}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Completed Trips</h2>
          <p>{completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Pending Trips</h2>
          <p>{pending}</p>
        </div>
      </div>
    </div>
  );
}
