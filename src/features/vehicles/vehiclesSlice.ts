import { createSlice } from '@reduxjs/toolkit';
import { Vehicle } from '../../types';

const initialVehicles: Vehicle[] = Array.from({ length: 100 }, (_, i) => ({
  id: `v${i}`,
  plateNumber: `B${1000 + i}FFB`,
  type: 'Truck',
  capacity: 12,
  driver: null,
  status: 'active',
}));

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: { items: initialVehicles },
  reducers: {}
});

export default vehiclesSlice.reducer;
