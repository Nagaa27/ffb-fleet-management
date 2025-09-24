// src/features/trips/tripsSlice.test.ts

import tripsReducer, {
  addTrip,
  markTripCompleted,
} from './tripsSlice';
import { Trip } from '../../types';

// contoh trip dummy
const dummyTrip: Trip = {
  id: 'trip-1',
  vehicle: {
    id: 'veh-1',
    plateNumber: 'B 1234 CD',
    type: 'Truck',
    capacity: 5,
    driver: null,
    status: 'active'
  },
  driver: {
    id: 'driver-1',
    name: 'John Doe',
    licenseNumber: 'ABC123',
    phoneNumber: '08123',
    status: 'available'
  },
  mills: [
    {
      id: 'mill-1',
      name: 'Mill A',
      location: { lat: 0, lng: 0 },
      contactPerson: 'Manager',
      phoneNumber: '08123',
      avgDailyProduction: 50
    }
  ],
  scheduledDate: new Date(),
  status: 'scheduled',
  estimatedDuration: 120
};

describe('tripsSlice', () => {
  it('should return the initial state', () => {
    const initialState = tripsReducer(undefined, { type: '@@INIT' });
    expect(initialState).toBeDefined();
    expect(Array.isArray(initialState.items)).toBe(true);
  });

  it('should handle addTrip', () => {
    const previousState = { items: [] };
    const nextState = tripsReducer(previousState as any, addTrip(dummyTrip));
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].id).toBe('trip-1');
  });

  it('should handle markTripCompleted', () => {
    const previousState = { items: [dummyTrip] };
    const nextState = tripsReducer(previousState as any, markTripCompleted('trip-1'));
    expect(nextState.items[0].status).toBe('completed');
  });
});
