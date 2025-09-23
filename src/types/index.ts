export type VehicleStatus = 'active' | 'inactive';
export type DriverStatus = 'available' | 'assigned';
export type TripStatus = 'scheduled' | 'completed' | 'pending';

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  status: DriverStatus;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  capacity: number; // tons
  driver: Driver | null;
  status: VehicleStatus;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Mill {
  id: string;
  name: string;
  location: GeoLocation;
  contactPerson: string;
  phoneNumber: string;
  avgDailyProduction: number; // tons
}

export interface Trip {
  id: string;
  vehicle: Vehicle;
  driver: Driver;
  mills: Mill[];
  scheduledDate: Date;
  status: TripStatus;
  estimatedDuration: number; // minutes
}
