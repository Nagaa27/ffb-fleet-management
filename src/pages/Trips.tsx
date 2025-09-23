import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTrip, updateTripStatus } from '../features/trips/tripsSlice';
import { Trip } from '../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Trips() {
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const drivers = useSelector((state: RootState) => state.drivers.items);
  const mills = useSelector((state: RootState) => state.mills.items);
  const trips = useSelector((state: RootState) => state.trips.items);
  const dispatch = useDispatch();

  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedMill, setSelectedMill] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  // 🔹 filter status + pagination
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'pending'>('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 apply filter
  const filteredTrips =
    statusFilter === 'all'
      ? trips
      : trips.filter(t => t.status === statusFilter);

  // 🔹 apply pagination
  const paginatedTrips = filteredTrips.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

  const handleCreateTrip = () => {
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    const driver = drivers.find(d => d.id === selectedDriver);
    const mill = mills.find(m => m.id === selectedMill);

    if (!vehicle || !driver || !mill || !scheduledDate) {
      alert('Lengkapi semua field');
      return;
    }

    // VALIDASI kapasitas
    if (vehicle.capacity < mill.avgDailyProduction) {
      alert(
        `Warning: Vehicle capacity (${vehicle.capacity} ton) lebih kecil dari mill production (${mill.avgDailyProduction} ton/hari)`
      );
    }

    const newTrip: Trip = {
      id: uuidv4(),
      vehicle,
      driver,
      mills: [mill],
      scheduledDate: new Date(scheduledDate),
      status: 'scheduled',
      estimatedDuration: 120,
    };

    dispatch(addTrip(newTrip));
    alert('Trip berhasil dibuat!');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Trip Planning & Scheduling</h1>

      {/* Form Buat Trip */}
      <div className="grid gap-4 max-w-md">
        <select
          className="border p-2"
          value={selectedVehicle}
          onChange={e => setSelectedVehicle(e.target.value)}
        >
          <option value="">Pilih Vehicle</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.plateNumber} ({v.capacity} ton)
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={selectedDriver}
          onChange={e => setSelectedDriver(e.target.value)}
        >
          <option value="">Pilih Driver</option>
          {drivers.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={selectedMill}
          onChange={e => setSelectedMill(e.target.value)}
        >
          <option value="">Pilih Mill</option>
          {mills.map(m => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.avgDailyProduction} ton/day)
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2"
          value={scheduledDate}
          onChange={e => setScheduledDate(e.target.value)}
        />

        <button
          onClick={handleCreateTrip}
          className="bg-green-600 text-white p-2 rounded"
        >
          Buat Trip
        </button>
      </div>

      {/* Filter Status */}
      <h2 className="text-lg font-bold mt-6">Daftar Trip</h2>
      <div className="mb-2">
        <select
          value={statusFilter}
          onChange={e => {
            setPage(1);
            setStatusFilter(e.target.value as any);
          }}
          className="border rounded p-1"
        >
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* List Trip */}
      <ul className="list-disc pl-5">
        {paginatedTrips.map(t => (
          <li key={t.id} className="mb-2">
            {t.driver.name} → {t.mills[0].name} on {new Date(t.scheduledDate).toLocaleDateString()}
            <span className="ml-2 text-gray-600">({t.status})</span>

            {t.status !== 'completed' && (
              <button
                onClick={() => dispatch(updateTripStatus({ id: t.id, status: 'completed' }))}
                className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
              >
                Mark Completed
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
