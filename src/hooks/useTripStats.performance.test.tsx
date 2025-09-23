import { renderHook } from '@testing-library/react';
import { useTripStats } from './useTripStats';
import { Trip } from '../types';

// generate 1000 trips dummy
const bigTrips: Trip[] = Array.from({ length: 1000 }, (_, i) => ({
  id: `t${i}`,
  vehicle: { id: `v${i}`, plateNumber: `B${i}`, type: 'Truck', capacity: 12 } as any,
  driver: { id: `d${i}`, name: `Driver ${i}`, licenseNumber: `DRV${i}` } as any,
  mills: [
    {
      id: `m${i}`,
      name: `Mill ${i}`,
      avgDailyProduction: 30,
      location: { lat: 0, lng: 0 },
      contactPerson: 'John Doe',
      phoneNumber: '12345',
    },
  ],
  scheduledDate: new Date(),
  status: i % 3 === 0 ? 'completed' : 'scheduled',
  estimatedDuration: 120,
}));

test('useTripStats handles 1000 trips fast enough', () => {
  const start = performance.now();
  const { result } = renderHook(() => useTripStats(bigTrips));
  const end = performance.now();

  expect(result.current.completed + result.current.scheduled + result.current.pending)
    .toBe(bigTrips.length);

  // test harus cepat (<100ms misalnya)
  expect(end - start).toBeLessThan(100);
});
