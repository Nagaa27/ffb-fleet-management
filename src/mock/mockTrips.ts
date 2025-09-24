import { Trip } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Vehicle, Driver, Mill } from '../types';

// misal ambil vehicle/driver/mill dari slice atau buat dummy sesuai type
const vehicles: Vehicle[] = Array.from({ length: 100 }, (_, i) => ({
  id: `v${i}`,
  plateNumber: `B${1000 + i}FFB`,
  type: 'Truck',
  capacity: 12,
  driver: null,
  status: 'active',
}));

const drivers: Driver[] = Array.from({ length: 100 }, (_, i) => ({
  id: `d${i}`,
  name: `Driver ${i}`,
  licenseNumber: `DRV${i}`,
  phoneNumber: '0812345678',
  status: 'available',
}));

const mills: Mill[] = Array.from({ length: 20 }, (_, i) => ({
  id: `m${i}`,
  name: `Mill ${i}`,
  location: { lat: 0, lng: 0 },
  contactPerson: 'John Doe',
  phoneNumber: '081111111',
  avgDailyProduction: 30,
}));

export const mockTrips: Trip[] = Array.from({ length: 1000 }, (_, i) => ({
  id: uuidv4(),
  vehicle: vehicles[i % vehicles.length],
  driver: drivers[i % drivers.length],
  mills: [mills[i % mills.length]],
  scheduledDate: new Date(),
  status: i % 3 === 0 ? 'completed' : 'scheduled',
  estimatedDuration: 120,
}));
