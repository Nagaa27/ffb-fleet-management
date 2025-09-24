import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const getTrips = () => axios.get(`${API_BASE}/trips`);

export const createTrip = (trip: any) => axios.post(`${API_BASE}/trips`, trip);

export const updateTripStatus = (id: string, status: string) =>
  axios.put(`${API_BASE}/trips/${id}`, { status });
