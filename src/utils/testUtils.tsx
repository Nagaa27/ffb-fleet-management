// src/__tests__/testUtils.tsx
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';
import driversReducer from '../features/drivers/driversSlice';
import millsReducer from '../features/mills/millsSlice';
import tripsReducer from '../features/trips/tripsSlice';

export function renderWithCustomStore(ui: React.ReactNode, preloadedState: any) {
  // pakai `as any` supaya tidak error type
  const store = configureStore({
    reducer: {
      vehicles: vehiclesReducer as any,
      drivers: driversReducer as any,
      mills: millsReducer as any,
      trips: tripsReducer as any,
    } as any,
    preloadedState,
  });

  const { render } = require('@testing-library/react');

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
