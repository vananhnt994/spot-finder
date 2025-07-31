import React, { useState } from 'react';
import { Room, TimeSlot } from '@/types/booking';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { generateTimeSlots } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface BookingModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onBookingConfirm: (booking: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ room, open, onClose, onBookingConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [bookingTitle, setBookingTitle] = useState('');
  const [userEmail, setUserEmail] = useState('john.doe@company.com');

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleBooking = () => {
    if (!room || !selectedDate || !selectedTimeSlot || !bookingTitle.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const booking = {
      id: `book-${Date.now()}`,
      roomId: room.id,
      userId: 'user-current',
      userEmail,
      title: bookingTitle,
      startTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
                          parseInt(selectedTimeSlot.start.split(':')[0]), 
                          parseInt(selectedTimeSlot.start.split(':')[1])),
      endTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
                        parseInt(selectedTimeSlot.end.split(':')[0]), 
                        parseInt(selectedTimeSlot.end.split(':')[1])),
      status: 'confirmed',
      createdAt: new Date()
    };

    onBookingConfirm(booking);
    toast.success(`Successfully booked ${room.name}!`);
    onClose();
    
    // Reset form
    setBookingTitle('');
    setSelectedTimeSlot(null);
  };

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-5 h-5 text-primary" />
            Book {room.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {room.capacity} people
            </span>
            <span>{room.floor}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Booking Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title *</Label>
            <Input
              id="title"
              placeholder="Enter meeting title..."
              value={bookingTitle}
              onChange={(e) => setBookingTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available Time Slots *
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg bg-muted/20">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTimeSlot === slot ? "default" : "outline"}
                  size="sm"
                  disabled={!slot.available}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={cn(
                    "justify-start text-xs h-8",
                    selectedTimeSlot === slot && "bg-primary text-primary-foreground",
                    !slot.available && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {slot.start} - {slot.end}
                </Button>
              ))}
            </div>
          </div>

          {/* Room Amenities */}
          <div className="space-y-2">
            <Label>Available Amenities</Label>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleBooking} 
            className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
            disabled={!bookingTitle.trim() || !selectedDate || !selectedTimeSlot}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;