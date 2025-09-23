// src/features/vehicles/vehiclesSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface Vehicle {
  id: string;
  plate: string;
  capacity: number;
}

export interface VehiclesState {
  items: Vehicle[];
}

const initialState: VehiclesState = {
  items: Array.from({ length: 150 }, (_, i) => ({
    id: `v${i}`,
    plate: `B${1000 + i}XYZ`,
    capacity: 10 + (i % 10), // ton
  })),
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
});

export default vehiclesSlice.reducer;
