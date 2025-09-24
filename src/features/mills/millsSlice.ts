import { createSlice } from '@reduxjs/toolkit';
import { Mill } from '../../types';

const initialMills: Mill[] = Array.from({ length: 20 }, (_, i) => ({
  id: `m${i}`,
  name: `Mill ${i}`,
  location: { lat: 0, lng: 0 },
  contactPerson: 'John Doe',
  phoneNumber: '081111111',
  avgDailyProduction: 30,
}));

const millsSlice = createSlice({
  name: 'mills',
  initialState: { items: initialMills },
  reducers: {}
});

export default millsSlice.reducer;
