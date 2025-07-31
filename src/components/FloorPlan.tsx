import React, { useState } from 'react';
import { Room } from '@/types/booking';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Monitor, Coffee, Camera, Volume2 } from 'lucide-react';

interface FloorPlanProps {
  rooms: Room[];
  selectedRoom?: Room | null;
  onRoomSelect: (room: Room) => void;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ rooms, selectedRoom, onRoomSelect }) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'fill-status-available';
      case 'booked': return 'fill-status-booked';
      case 'partial': return 'fill-status-partial';
      case 'maintenance': return 'fill-status-maintenance';
      default: return 'fill-muted';
    }
  };

  const getStatusBorderColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'stroke-status-available';
      case 'booked': return 'stroke-status-booked';
      case 'partial': return 'stroke-status-partial';
      case 'maintenance': return 'stroke-status-maintenance';
      default: return 'stroke-muted';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi') || amenity.toLowerCase().includes('wireless')) return <Wifi className="w-3 h-3" />;
    if (amenity.toLowerCase().includes('monitor') || amenity.toLowerCase().includes('tv') || amenity.toLowerCase().includes('screen')) return <Monitor className="w-3 h-3" />;
    if (amenity.toLowerCase().includes('coffee')) return <Coffee className="w-3 h-3" />;
    if (amenity.toLowerCase().includes('video') || amenity.toLowerCase().includes('camera')) return <Camera className="w-3 h-3" />;
    if (amenity.toLowerCase().includes('audio') || amenity.toLowerCase().includes('sound')) return <Volume2 className="w-3 h-3" />;
    return null;
  };

  const getTextSize = (room: Room) => {
    const area = room.width * room.height;
    if (area > 8000) return 'text-sm font-bold'; // Large rooms
    if (area > 4000) return 'text-xs font-semibold'; // Medium rooms  
    return 'text-[10px] font-medium'; // Small rooms
  };

  const shouldShowCapacity = (room: Room) => {
    return room.width > 50 && room.height > 40; // Only show capacity for rooms large enough
  };

  const getRoomDisplayName = (room: Room) => {
    // Shorten long room names for better display
    if (room.width < 80) {
      return room.name.split(' ').slice(0, 2).join(' ');
    }
    return room.name;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Floor Plan SVG */}
      <div className="flex-1 bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <h2 className="text-xl font-semibold text-foreground">2nd Floor - Office Layout</h2>
          <p className="text-sm text-muted-foreground">Click on any room to view details and book</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-background to-muted/20">
          <svg 
            viewBox="0 0 650 600" 
            className="w-full h-auto max-h-[600px] rounded-lg border-2 border-border shadow-inner"
            style={{ backgroundColor: 'hsl(var(--background))' }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Building outline */}
            <rect x="30" y="30" width="590" height="540" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" rx="8"/>
            
            {/* Corridor */}
            <rect x="40" y="250" width="570" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" rx="4"/>
            <text x="320" y="275" textAnchor="middle" className="fill-muted-foreground text-sm font-medium">Main Corridor</text>
            
            {/* Rooms */}
            {rooms.map((room) => (
              <g key={room.id}>
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  className={cn(
                    getStatusColor(room.status),
                    getStatusBorderColor(room.status),
                    'cursor-pointer transition-all duration-300 hover:brightness-110',
                    selectedRoom?.id === room.id && 'ring-2 ring-primary ring-offset-2',
                    hoveredRoom === room.id && 'drop-shadow-lg'
                  )}
                  strokeWidth="2"
                  rx="6"
                  fill={`${hoveredRoom === room.id ? 'hsl(var(--primary) / 0.9)' : ''}`}
                  onClick={() => onRoomSelect(room)}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                />
                
                {/* Room label */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + (shouldShowCapacity(room) ? -6 : 2)}
                  textAnchor="middle"
                  className={`fill-white ${getTextSize(room)} pointer-events-none`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {getRoomDisplayName(room)}
                </text>
                
                {/* Capacity indicator - only for larger rooms */}
                {shouldShowCapacity(room) && (
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 + 8}
                    textAnchor="middle"
                    className="fill-white text-[10px] opacity-90 pointer-events-none"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    👥 {room.capacity}
                  </text>
                )}
              </g>
            ))}
            
            {/* Legend */}
            <g transform="translate(40, 580)">
              <rect x="0" y="-60" width="280" height="50" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" rx="4"/>
              <text x="10" y="-45" className="fill-foreground text-xs font-semibold">Status Legend:</text>
              
              <circle cx="20" cy="-25" r="6" className="fill-status-available"/>
              <text x="35" y="-20" className="fill-foreground text-xs">Available</text>
              
              <circle cx="90" cy="-25" r="6" className="fill-status-booked"/>
              <text x="105" y="-20" className="fill-foreground text-xs">Booked</text>
              
              <circle cx="150" cy="-25" r="6" className="fill-status-partial"/>
              <text x="165" y="-20" className="fill-foreground text-xs">Partial</text>
              
              <circle cx="210" cy="-25" r="6" className="fill-status-maintenance"/>
              <text x="225" y="-20" className="fill-foreground text-xs">Maintenance</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Room Details Panel */}
      {selectedRoom && (
        <div className="w-full lg:w-80 xl:w-96">
          <Card className="h-fit shadow-xl border-0 bg-gradient-to-br from-card to-card/90 backdrop-blur-sm">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{selectedRoom.name}</h3>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'px-3 py-1 font-medium border-2',
                    selectedRoom.status === 'available' && 'border-status-available text-status-available bg-status-available/10',
                    selectedRoom.status === 'booked' && 'border-status-booked text-status-booked bg-status-booked/10',
                    selectedRoom.status === 'partial' && 'border-status-partial text-status-partial bg-status-partial/10',
                    selectedRoom.status === 'maintenance' && 'border-status-maintenance text-status-maintenance bg-status-maintenance/10'
                  )}
                >
                  {selectedRoom.status.charAt(0).toUpperCase() + selectedRoom.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Capacity: {selectedRoom.capacity} people</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                      {getAmenityIcon(amenity)}
                      <span className="text-xs">{amenity}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300"
                  disabled={selectedRoom.status === 'booked' || selectedRoom.status === 'maintenance'}
                >
                  {selectedRoom.status === 'available' ? 'Book This Room' : 
                   selectedRoom.status === 'partial' ? 'View Available Times' :
                   selectedRoom.status === 'booked' ? 'Room Unavailable' : 
                   'Under Maintenance'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  View Schedule
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FloorPlan;