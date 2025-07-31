import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Booking, Room } from '@/types/booking';
import { cn } from '@/lib/utils';

interface BookingDashboardProps {
  bookings: Booking[];
  rooms: Room[];
  onCancelBooking: (bookingId: string) => void;
}

const BookingDashboard: React.FC<BookingDashboardProps> = ({ 
  bookings, 
  rooms, 
  onCancelBooking 
}) => {
  const getRoomById = (roomId: string) => rooms.find(room => room.id === roomId);

  const upcomingBookings = bookings
    .filter(booking => booking.endTime > new Date() && booking.status === 'confirmed')
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const pastBookings = bookings
    .filter(booking => booking.endTime <= new Date() || booking.status === 'cancelled')
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-status-available text-white';
      case 'pending': return 'bg-status-partial text-white';
      case 'cancelled': return 'bg-status-maintenance text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground">Manage your room reservations</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{upcomingBookings.length}</div>
          <div className="text-sm text-muted-foreground">Upcoming</div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>
            Your confirmed reservations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {upcomingBookings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming bookings</p>
              <p className="text-sm">Book a room to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {upcomingBookings.map((booking) => {
                const room = getRoomById(booking.roomId);
                return (
                  <div key={booking.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-foreground">{booking.title}</h3>
                          <Badge className={cn('px-2 py-1', getStatusColor(booking.status))}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{room?.name || 'Unknown Room'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {format(booking.startTime, 'MMM dd, HH:mm')} - {format(booking.endTime, 'HH:mm')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Up to {room?.capacity || 0} people</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Booked by: {booking.userEmail}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancelBooking(booking.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your booking history
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {pastBookings.map((booking) => {
                const room = getRoomById(booking.roomId);
                return (
                  <div key={booking.id} className="p-6 opacity-75">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{booking.title}</h3>
                          <Badge variant="outline" className={cn('px-2 py-1', getStatusColor(booking.status))}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{room?.name}</span>
                          <span>{format(booking.startTime, 'MMM dd, HH:mm')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingDashboard;