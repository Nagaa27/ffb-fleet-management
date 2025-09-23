import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './features/vehicles/vehiclesSlice'; // impor slice
import driversReducer from './features/drivers/driversSlice';
import millsReducer from './features/mills/millsSlice';
import tripsReducer from './features/trips/tripsSlice';

// Buat store Redux
export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    drivers: driversReducer,
    mills: millsReducer,
    trips: tripsReducer,
  },
});


// Export tipe untuk hooks nanti
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
