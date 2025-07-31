export interface Room {
  id: string;
  name: string;
  capacity: number;
  amenities: string[];
  status: 'available' | 'booked' | 'partial' | 'maintenance';
  x: number;
  y: number;
  width: number;
  height: number;
  floor: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userEmail: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
}