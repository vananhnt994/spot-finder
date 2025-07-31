import { Room, Booking } from '@/types/booking';

export const mockRooms: Room[] = [
  // Conference Rooms (Large)
  { id: 'conf-1', name: 'Boardroom Alpha', capacity: 20, amenities: ['Projector', 'Whiteboard', 'Video Conference'], status: 'available', x: 50, y: 50, width: 120, height: 80, floor: '2nd Floor' },
  { id: 'conf-2', name: 'Executive Suite', capacity: 16, amenities: ['Smart TV', 'Whiteboard', 'Coffee Machine'], status: 'booked', x: 200, y: 50, width: 120, height: 80, floor: '2nd Floor' },
  { id: 'conf-3', name: 'Innovation Hub', capacity: 12, amenities: ['Digital Whiteboard', 'Wireless Display'], status: 'available', x: 350, y: 50, width: 100, height: 80, floor: '2nd Floor' },
  
  // Meeting Rooms (Medium)
  { id: 'meet-1', name: 'Sync Room 1', capacity: 8, amenities: ['Monitor', 'Whiteboard'], status: 'partial', x: 50, y: 170, width: 75, height: 60, floor: '2nd Floor' },
  { id: 'meet-2', name: 'Sync Room 2', capacity: 8, amenities: ['Monitor', 'Whiteboard'], status: 'available', x: 140, y: 170, width: 75, height: 60, floor: '2nd Floor' },
  { id: 'meet-3', name: 'Sync Room 3', capacity: 6, amenities: ['TV Screen', 'Whiteboard'], status: 'booked', x: 230, y: 170, width: 75, height: 60, floor: '2nd Floor' },
  { id: 'meet-4', name: 'Sync Room 4', capacity: 6, amenities: ['Monitor'], status: 'available', x: 320, y: 170, width: 75, height: 60, floor: '2nd Floor' },
  
  // Phone Booths (Small)
  { id: 'phone-1', name: 'Phone Booth 1', capacity: 1, amenities: ['Soundproof'], status: 'available', x: 470, y: 50, width: 35, height: 35, floor: '2nd Floor' },
  { id: 'phone-2', name: 'Phone Booth 2', capacity: 1, amenities: ['Soundproof'], status: 'booked', x: 515, y: 50, width: 35, height: 35, floor: '2nd Floor' },
  { id: 'phone-3', name: 'Phone Booth 3', capacity: 1, amenities: ['Soundproof'], status: 'available', x: 560, y: 50, width: 35, height: 35, floor: '2nd Floor' },
  { id: 'phone-4', name: 'Phone Booth 4', capacity: 1, amenities: ['Soundproof'], status: 'available', x: 470, y: 95, width: 35, height: 35, floor: '2nd Floor' },
  
  // Collaboration Spaces
  { id: 'collab-1', name: 'Creative Space A', capacity: 10, amenities: ['Moveable Furniture', 'Whiteboard Walls'], status: 'available', x: 50, y: 270, width: 100, height: 70, floor: '2nd Floor' },
  { id: 'collab-2', name: 'Creative Space B', capacity: 10, amenities: ['Standing Desks', 'Digital Board'], status: 'maintenance', x: 170, y: 270, width: 100, height: 70, floor: '2nd Floor' },
  { id: 'collab-3', name: 'Brainstorm Zone', capacity: 8, amenities: ['Bean Bags', 'Whiteboard'], status: 'available', x: 290, y: 270, width: 100, height: 70, floor: '2nd Floor' },
  
  // Focus Rooms
  { id: 'focus-1', name: 'Focus Pod 1', capacity: 2, amenities: ['Quiet Zone', 'Monitor'], status: 'available', x: 50, y: 360, width: 60, height: 50, floor: '2nd Floor' },
  { id: 'focus-2', name: 'Focus Pod 2', capacity: 2, amenities: ['Quiet Zone', 'Monitor'], status: 'booked', x: 130, y: 360, width: 60, height: 50, floor: '2nd Floor' },
  { id: 'focus-3', name: 'Focus Pod 3', capacity: 2, amenities: ['Quiet Zone', 'Monitor'], status: 'available', x: 210, y: 360, width: 60, height: 50, floor: '2nd Floor' },
  { id: 'focus-4', name: 'Focus Pod 4', capacity: 2, amenities: ['Quiet Zone', 'Monitor'], status: 'partial', x: 290, y: 360, width: 60, height: 50, floor: '2nd Floor' },
  { id: 'focus-5', name: 'Focus Pod 5', capacity: 2, amenities: ['Quiet Zone', 'Monitor'], status: 'available', x: 370, y: 360, width: 60, height: 50, floor: '2nd Floor' },
  
  // Training Rooms
  { id: 'train-1', name: 'Training Room A', capacity: 25, amenities: ['Projector', 'Audio System', 'Tiered Seating'], status: 'available', x: 50, y: 430, width: 140, height: 90, floor: '2nd Floor' },
  { id: 'train-2', name: 'Training Room B', capacity: 20, amenities: ['Smart Board', 'Audio System'], status: 'booked', x: 210, y: 430, width: 120, height: 90, floor: '2nd Floor' },
  
  // Wellness Rooms
  { id: 'wellness-1', name: 'Meditation Room', capacity: 8, amenities: ['Yoga Mats', 'Dim Lighting'], status: 'available', x: 350, y: 430, width: 80, height: 60, floor: '2nd Floor' },
  { id: 'wellness-2', name: 'Quiet Retreat', capacity: 4, amenities: ['Comfortable Seating', 'Plants'], status: 'available', x: 450, y: 430, width: 60, height: 60, floor: '2nd Floor' },
  
  // Additional Meeting Spaces
  { id: 'casual-1', name: 'Café Meeting 1', capacity: 4, amenities: ['Coffee Bar', 'Casual Seating'], status: 'available', x: 450, y: 270, width: 60, height: 50, floor: '2nd Floor' },
  { id: 'casual-2', name: 'Café Meeting 2', capacity: 4, amenities: ['Coffee Bar', 'Casual Seating'], status: 'partial', x: 450, y: 330, width: 60, height: 50, floor: '2nd Floor' },
  
  // Interview Rooms
  { id: 'interview-1', name: 'Interview Room 1', capacity: 4, amenities: ['Professional Setup', 'Video Conference'], status: 'available', x: 410, y: 170, width: 65, height: 50, floor: '2nd Floor' },
  { id: 'interview-2', name: 'Interview Room 2', capacity: 4, amenities: ['Professional Setup', 'Video Conference'], status: 'booked', x: 485, y: 170, width: 65, height: 50, floor: '2nd Floor' },
  
  // Executive Offices (when available)
  { id: 'exec-1', name: 'Executive Office 1', capacity: 6, amenities: ['Private Bathroom', 'Premium Furniture'], status: 'maintenance', x: 470, y: 140, width: 75, height: 60, floor: '2nd Floor' },
  { id: 'exec-2', name: 'Executive Office 2', capacity: 6, amenities: ['Private Bathroom', 'Premium Furniture'], status: 'available', x: 555, y: 140, width: 75, height: 60, floor: '2nd Floor' },
  
  // Gaming/Recreation
  { id: 'rec-1', name: 'Game Room', capacity: 12, amenities: ['Gaming Console', 'Comfortable Seating'], status: 'available', x: 350, y: 510, width: 100, height: 60, floor: '2nd Floor' },
  
  // Presentation Rooms
  { id: 'present-1', name: 'Demo Room', capacity: 15, amenities: ['Large Screen', 'Stage Area', 'Audio System'], status: 'available', x: 470, y: 510, width: 130, height: 60, floor: '2nd Floor' }
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