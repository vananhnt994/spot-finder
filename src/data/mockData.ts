// src/data/mockData.ts

import { Room, Booking } from '@/types/booking';

export const mockRooms: Room[] = [
  // Top Row
  { id: 'r1', name: 'Boardroom Alpha', capacity: 20, floor: '1', x: 40, y: 40, width: 130, height: 90, status: 'available', amenities: ['Projector', 'Whiteboard', 'Video Conferencing'] },
  { id: 'r2', name: 'Executive Suite', capacity: 16, floor: '1', x: 180, y: 40, width: 120, height: 90, status: 'booked', amenities: ['Coffee Machine', 'Private Restroom'] },
  { id: 'r3', name: 'Innovation Hub', capacity: 12, floor: '1', x: 310, y: 40, width: 120, height: 90, status: 'partial', amenities: ['Smartboard', 'VR Headsets'] },
  { id: 'r22', name: 'Executive Office 1', capacity: 6, floor: '1', x: 440, y: 40, width: 90, height: 60, status: 'booked', amenities: ['Monitor', 'Docking Station'] },
  { id: 'r23', name: 'Executive Office 2', capacity: 6, floor: '1', x: 540, y: 40, width: 90, height: 60, status: 'maintenance', amenities: ['Monitor', 'Docking Station'] },

  // Second Row (Small Rooms)
  { id: 'r4', name: 'Phone Booth 1', capacity: 1, floor: '1', x: 440, y: 110, width: 40, height: 40, status: 'available', amenities: ['Sound Proofing'] },
  { id: 'r5', name: 'Phone Booth 2', capacity: 1, floor: '1', x: 490, y: 110, width: 40, height: 40, status: 'available', amenities: ['Sound Proofing'] },
  { id: 'r6', name: 'Phone Booth 3', capacity: 1, floor: '1', x: 540, y: 110, width: 40, height: 40, status: 'booked', amenities: ['Sound Proofing'] },
  { id: 'r7', name: 'Phone Booth 4', capacity: 1, floor: '1', x: 590, y: 110, width: 40, height: 40, status: 'available', amenities: ['Sound Proofing'] },

  // Third Row (Sync Rooms)
  { id: 'r8', name: 'Sync Room 1', capacity: 8, floor: '1', x: 40, y: 160, width: 90, height: 70, status: 'available', amenities: ['TV', 'Wireless Display'] },
  { id: 'r9', name: 'Sync Room 2', capacity: 8, floor: '1', x: 140, y: 160, width: 90, height: 70, status: 'available', amenities: ['TV', 'Wireless Display'] },
  { id: 'r10', name: 'Sync Room 3', capacity: 6, floor: '1', x: 240, y: 160, width: 90, height: 70, status: 'booked', amenities: ['TV', 'Wireless Display'] },
  { id: 'r11', name: 'Sync Room 4', capacity: 6, floor: '1', x: 340, y: 160, width: 90, height: 70, status: 'available', amenities: ['TV', 'Wireless Display'] },
  { id: 'r12', name: 'Interview Room', capacity: 4, floor: '1', x: 440, y: 160, width: 90, height: 70, status: 'partial', amenities: ['Camera', 'Microphone'] },

  // Below Corridor
  { id: 'r13', name: 'Creative Space A', capacity: 10, floor: '1', x: 40, y: 290, width: 120, height: 80, status: 'available', amenities: ['Whiteboard Wall', 'Bean Bags'] },
  { id: 'r14', name: 'Creative Space B', capacity: 10, floor: '1', x: 170, y: 290, width: 120, height: 80, status: 'available', amenities: ['Whiteboard Wall', 'Art Supplies'] },
  { id: 'r15', name: 'Brainstorm Zone', capacity: 8, floor: '1', x: 300, y: 290, width: 120, height: 80, status: 'booked', amenities: ['Sticky Notes', 'Markers'] },
  { id: 'r24', name: 'Café Meeting 1', capacity: 4, floor: '1', x: 430, y: 290, width: 95, height: 55, status: 'available', amenities: ['Coffee', 'Snacks'] },
  { id: 'r25', name: 'Café Meeting 2', capacity: 4, floor: '1', x: 535, y: 290, width: 95, height: 55, status: 'partial', amenities: ['Coffee', 'Snacks'] },

  // Bottom Row (Focus & Training)
  { id: 'r16', name: 'Focus Pod 1', capacity: 2, floor: '1', x: 40, y: 380, width: 60, height: 60, status: 'available', amenities: ['Desk', 'Power Outlet'] },
  { id: 'r17', name: 'Focus Pod 2', capacity: 2, floor: '1', x: 110, y: 380, width: 60, height: 60, status: 'booked', amenities: ['Desk', 'Power Outlet'] },
  { id: 'r18', name: 'Focus Pod 3', capacity: 2, floor: '1', x: 180, y: 380, width: 60, height: 60, status: 'available', amenities: ['Desk', 'Power Outlet'] },
  { id: 'r19', name: 'Focus Pod 4', capacity: 2, floor: '1', x: 250, y: 380, width: 60, height: 60, status: 'available', amenities: ['Desk', 'Power Outlet'] },
  { id: 'r20', name: 'Focus Pod 5', capacity: 2, floor: '1', x: 320, y: 380, width: 60, height: 60, status: 'maintenance', amenities: ['Desk', 'Power Outlet'] },

  // Last Row
  { id: 'r21', name: 'Training Room A', capacity: 25, floor: '1', x: 40, y: 450, width: 140, height: 90, status: 'available', amenities: ['Projector', 'Seats'] },
  { id: 'r26', name: 'Training Room B', capacity: 20, floor: '1', x: 190, y: 450, width: 140, height: 90, status: 'partial', amenities: ['Projector', 'Seats'] },
  { id: 'r27', name: 'Meditation Room', capacity: 8, floor: '1', x: 340, y: 450, width: 90, height: 90, status: 'available', amenities: ['Yoga Mats', 'Calm Music'] },
  { id: 'r28', name: 'Quiet Retreat', capacity: 4, floor: '1', x: 440, y: 450, width: 90, height: 90, status: 'available', amenities: ['Comfortable Chairs'] },
  { id: 'r29', name: 'Game Room', capacity: 12, floor: '1', x: 540, y: 380, width: 90, height: 80, status: 'booked', amenities: ['Console', 'Big Screen'] },
  { id: 'r30', name: 'Demo Room', capacity: 15, floor: '1', x: 540, y: 470, width: 90, height: 70, status: 'available', amenities: ['Product Demos'] },
];
export const mockBookings: Booking[] = [
  {
    id: 'book-1',
    roomId: 'conf-2',
    userId: 'user-1',
    userEmail: 'john.doe@company.com',
    title: 'Quarterly Review',
    startTime: new Date(2024, 7, 31, 14, 0),
    endTime: new Date(2024, 7, 31, 16, 0),
    status: 'confirmed',
    createdAt: new Date(2024, 7, 30, 10, 0)
  },
  {
    id: 'book-2',
    roomId: 'meet-3',
    userId: 'user-2',
    userEmail: 'jane.smith@company.com',
    title: 'Team Standup',
    startTime: new Date(2024, 7, 31, 9, 0),
    endTime: new Date(2024, 7, 31, 10, 0),
    status: 'confirmed',
    createdAt: new Date(2024, 7, 30, 15, 0)
  }
];

export const generateTimeSlots = (date: Date) => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endMinute = minute + 30;
      const endHour = endMinute >= 60 ? hour + 1 : hour;
      const adjustedMinute = endMinute >= 60 ? 0 : endMinute;
      const end = `${endHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;

      slots.push({
        start,
        end,
        available: Math.random() > 0.3 // 70% chance of being available
      });
    }
  }
  return slots;
};