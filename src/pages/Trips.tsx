/** @format */

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addTrip, updateTripStatus, setTrips } from "../features/trips/tripsSlice";
import { Trip } from "../types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function Trips() {
  const vehicles = useSelector((state: RootState) => state.vehicles.items);
  const drivers = useSelector((state: RootState) => state.drivers.items);
  const mills = useSelector((state: RootState) => state.mills.items);
  const trips = useSelector((state: RootState) => state.trips.items);
  const dispatch = useDispatch();

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedMill, setSelectedMill] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  // filter status + pagination
  const [statusFilter, setStatusFilter] = useState<"all" | "scheduled" | "completed" | "pending">("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Gaya untuk Formulir dan tombol
  const formStyle: React.CSSProperties = {
    display: "grid",
    gap: "1rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#38a169",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2f855a",
  };

  const filterStyle = {
    marginBottom: "16px",
  };

  const listItemStyle = {
    marginBottom: "12px",
  };

  // ✅ Load trips from backend when component mounts
  useEffect(() => {
    axios.get("http://localhost:4000/trips").then((res) => {
      const tripsFromBackend: Trip[] = res.data.map((t: any) => ({
        id: t.id,
        driver: {
          id: "driver-" + t.id,
          name: t.driver,
          licenseNumber: "",
          phoneNumber: "",
          status: "available",
        },
        vehicle: {
          id: "vehicle-" + t.id,
          plateNumber: t.vehicle,
          type: "",
          capacity: 0,
          driver: null,
          status: "active",
        },
        mills: [
          {
            id: "mill-" + t.id,
            name: t.mill,
            location: { lat: 0, lng: 0 },
            contactPerson: "",
            phoneNumber: "",
            avgDailyProduction: 0,
          },
        ],
        scheduledDate: new Date(t.scheduledDate),
        status: t.status,
        estimatedDuration: 120,
      }));

      dispatch(setTrips(tripsFromBackend)); // ✅ ini load awal
    });
  }, [dispatch]);

  // filter
  const filteredTrips = statusFilter === "all" ? trips : trips.filter((t) => t.status === statusFilter);

  // pagination
  const paginatedTrips = filteredTrips.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

  // ✅ Buat Trip baru
  const handleCreateTrip = () => {
    const vehicle = vehicles.find((v) => v.id === selectedVehicle);
    const driver = drivers.find((d) => d.id === selectedDriver);
    const mill = mills.find((m) => m.id === selectedMill);

    if (!vehicle || !driver || !mill || !scheduledDate) {
      alert("Lengkapi semua field");
      return;
    }

    // validasi kapasitas
    if (vehicle.capacity < mill.avgDailyProduction) {
      alert(`Warning: Vehicle capacity (${vehicle.capacity} ton) lebih kecil dari mill production (${mill.avgDailyProduction} ton/hari)`);
    }

    const newTrip: Trip = {
      id: uuidv4(),
      vehicle,
      driver,
      mills: [mill],
      scheduledDate: new Date(scheduledDate),
      status: "scheduled",
      estimatedDuration: 120,
    };

    // kirim ke backend
    axios
      .post("http://localhost:4000/trips", {
        id: newTrip.id,
        driver: newTrip.driver.name,
        vehicle: newTrip.vehicle.plateNumber,
        mill: newTrip.mills[0].name,
        scheduledDate: newTrip.scheduledDate.toISOString(),
        status: newTrip.status,
      })
      .then(() => {
        dispatch(addTrip(newTrip));
        alert("Trip berhasil dibuat!");
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal menyimpan trip ke server");
      });
  };

  // ✅ Handle Mark Completed
  const handleMarkCompleted = (tripId: string) => {
    axios
      .put(`http://localhost:4000/trips/${tripId}`, { status: "completed" })
      .then(() => {
        dispatch(updateTripStatus({ id: tripId, status: "completed" }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign:"center" }}>Trip Planning & Scheduling</h1>

      <div style={formStyle}>
        <select style={inputStyle} value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
          <option value="">Pilih Vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.plateNumber} ({v.capacity} ton)
            </option>
          ))}
        </select>

        <select style={inputStyle} value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
          <option value="">Pilih Driver</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select style={inputStyle} value={selectedMill} onChange={(e) => setSelectedMill(e.target.value)}>
          <option value="">Pilih Mill</option>
          {mills.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.avgDailyProduction} ton/day)
            </option>
          ))}
        </select>

        <input type="date" style={inputStyle} value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />

        <button
          onClick={handleCreateTrip}
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#38a169")}
        >
          Buat Trip
        </button>
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px", textAlign: "center" }}>Daftar Trip</h2>

      <div style={filterStyle}>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value as any);
          }}
          style={inputStyle}
        >
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <ul style={{ paddingLeft: "20px", textAlign:"center" }}>
        {paginatedTrips.map((t) => (
          <li key={t.id} style={listItemStyle}>
            {t.driver.name} → {t.mills[0].name} on {new Date(t.scheduledDate).toLocaleDateString()}
            <span style={{ marginLeft: "8px", color: "#6b7280" }}>({t.status})</span>
            {t.status !== "completed" && (
              <button
                onClick={() => handleMarkCompleted(t.id)}
                style={{
                  fontSize: "12px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Mark Completed
              </button>
            )}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              backgroundColor: page === i + 1 ? "#3b82f6" : "#d1d5db",
              color: page === i + 1 ? "white" : "black",
              marginLeft: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
