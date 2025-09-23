import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver } from '../../types';

interface DriversState {
  items: Driver[];
}

const initialState: DriversState = {
  items: [
    {
      id: 'd1',
      name: 'Budi Santoso',
      licenseNumber: 'SIM12345',
      phoneNumber: '08123456789',
      status: 'available',
    },
  ],
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    addDriver: (state, action: PayloadAction<Driver>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addDriver } = driversSlice.actions;
export default driversSlice.reducer;
