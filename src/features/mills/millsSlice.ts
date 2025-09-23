import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mill } from '../../types';

interface MillsState {
  items: Mill[];
}

const initialState: MillsState = {
  items: [
    {
      id: 'm1',
      name: 'Palm Oil Mill A',
      location: { lat: -2.123, lng: 104.123 },
      contactPerson: 'Pak Andi',
      phoneNumber: '081298765432',
      avgDailyProduction: 30, // tons
    },
  ],
};

const millsSlice = createSlice({
  name: 'mills',
  initialState,
  reducers: {
    addMill: (state, action: PayloadAction<Mill>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addMill } = millsSlice.actions;
export default millsSlice.reducer;
