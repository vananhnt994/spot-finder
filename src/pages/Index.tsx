import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloorPlan from '@/components/FloorPlan';
import BookingModal from '@/components/BookingModal';
import BookingDashboard from '@/components/BookingDashboard';
import { mockRooms, mockBookings } from '@/data/mockData';
import { Room, Booking } from '@/types/booking';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState('floor-plan');

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    if (room.status === 'available' || room.status === 'partial') {
      setBookingModalOpen(true);
    }
  };

  const handleBookingConfirm = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
    
    // Update room status to booked
    setRooms(prev => prev.map(room => 
      room.id === newBooking.roomId 
        ? { ...room, status: 'booked' as const }
        : room
    ));
  };

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setBookings(prev => prev.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'cancelled' as const }
          : b
      ));
      
      // Update room status back to available
      setRooms(prev => prev.map(room => 
        room.id === booking.roomId 
          ? { ...room, status: 'available' as const }
          : room
      ));
      
      toast.success('Booking cancelled successfully');
    }
  };

  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const bookedRooms = rooms.filter(room => room.status === 'booked').length;
  const upcomingBookings = bookings.filter(booking => 
    booking.endTime > new Date() && booking.status === 'confirmed'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Office Booking System</h1>
                <p className="text-muted-foreground">Book meeting rooms and workspaces</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-status-available">{availableRooms}</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-status-booked">{bookedRooms}</div>
                  <div className="text-xs text-muted-foreground">Booked</div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{upcomingBookings}</div>
                  <div className="text-xs text-muted-foreground">My Bookings</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="floor-plan" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Floor Plan
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="floor-plan" className="space-y-6">
            <FloorPlan 
              rooms={rooms}
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
            />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingDashboard 
              bookings={bookings}
              rooms={rooms}
              onCancelBooking={handleCancelBooking}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      <BookingModal
        room={selectedRoom}
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingConfirm={handleBookingConfirm}
      />
    </div>
  );
};

export default Index;
