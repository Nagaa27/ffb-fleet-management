// src/hooks/useTripStats.test.ts
import { useTripStats } from './useTripStats';
import { Trip } from '../types';

describe('useTripStats', () => {
  const trips: Trip[] = [
    {
      id: '1',
      vehicle: {} as any,
      driver: {} as any,
      mills: [] as any,
      scheduledDate: new Date(),
      status: 'scheduled',
      estimatedDuration: 120,
    },
    {
      id: '2',
      vehicle: {} as any,
      driver: {} as any,
      mills: [] as any,
      scheduledDate: new Date(),
      status: 'completed',
      estimatedDuration: 120,
    },
    {
      id: '3',
      vehicle: {} as any,
      driver: {} as any,
      mills: [] as any,
      scheduledDate: new Date(),
      status: 'pending',
      estimatedDuration: 120,
    },
    {
      id: '4',
      vehicle: {} as any,
      driver: {} as any,
      mills: [] as any,
      scheduledDate: new Date(),
      status: 'scheduled',
      estimatedDuration: 120,
    },
  ];

  it('should correctly count scheduled, completed, and pending trips', () => {
    const stats = useTripStats(trips);

    expect(stats.scheduled).toBe(2); // trip 1 & 4
    expect(stats.completed).toBe(1); // trip 2
    expect(stats.pending).toBe(1);   // trip 3
  });

  it('should return zeros when no trips', () => {
    const stats = useTripStats([]);
    expect(stats).toEqual({ scheduled: 0, completed: 0, pending: 0 });
  });
});
