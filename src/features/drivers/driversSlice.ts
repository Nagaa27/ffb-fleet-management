import { createSlice } from '@reduxjs/toolkit';
import { Driver } from '../../types';

const initialDrivers: Driver[] = Array.from({ length: 100 }, (_, i) => ({
  id: `d${i}`,
  name: `Driver ${i}`,
  licenseNumber: `DRV${i}`,
  phoneNumber: '0812345678',
  status: 'available',
}));

const driversSlice = createSlice({
  name: 'drivers',
  initialState: { items: initialDrivers },
  reducers: {}
});

export default driversSlice.reducer;
