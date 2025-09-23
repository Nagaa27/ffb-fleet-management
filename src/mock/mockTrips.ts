import { Trip } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const mockTrips: Trip[] = Array.from({ length: 100 }, (_, i) => ({
  id: uuidv4(),
  vehicle: {
    id: `v${i}`,
    plateNumber: `B${1000 + i}FFB`,
    type: 'Truck',
    capacity: 12,
    driver: null,
    status: 'active',
  } as any,
  driver: {
    id: `d${i}`,
    name: `Driver ${i}`,
    licenseNumber: `DRV${i}`,
  } as any,
  mills: [
    {
      id: `m${i}`,
      name: `Mill ${i}`,
      avgDailyProduction: 30,
      location: { lat: -6.2 + i * 0.01, lng: 106.8 + i * 0.01 }, // ✅ GeoLocation
      contactPerson: `Person ${i}`,
      phoneNumber: `081234567${i}`,
    },
  ],
  scheduledDate: new Date(),
  status: i % 3 === 0 ? 'completed' : 'scheduled',
  estimatedDuration: 120,
}));
