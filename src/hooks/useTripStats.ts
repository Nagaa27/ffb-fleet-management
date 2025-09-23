import { Trip } from '../types';

export function useTripStats(trips: Trip[]) {
  return {
    scheduled: trips.filter(t => t.status === 'scheduled').length,
    completed: trips.filter(t => t.status === 'completed').length,
    pending: trips.filter(t => t.status === 'pending').length,
  };
}
