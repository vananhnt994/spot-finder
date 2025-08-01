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

  // src/components/FloorPlan.tsx

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'fill-gray-700/80';
      case 'booked': return 'fill-red-800/80';
      case 'partial': return 'fill-yellow-800/80';
      case 'maintenance': return 'fill-blue-800/80';
      default: return 'fill-gray-600';
    }
  };

  const getStatusBorderColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'stroke-gray-500';
      case 'booked': return 'stroke-red-600';
      case 'partial': return 'stroke-yellow-600';
      case 'maintenance': return 'stroke-blue-600';
      default: return 'stroke-gray-400';
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
    if (area > 6000) return 'text-xs';        // Große Räume
    if (area > 3000) return 'text-[10px]';    // Mittlere Räume
    if (area > 1000) return 'text-[8px]';     // Kleine Räume
    return 'text-[7px]';                      // Sehr kleine Räume
  };

  const shouldShowCapacity = (room: Room) => {
    return room.width * room.height > 2000; // Kapazität nur für ausreichend große Räume anzeigen
  };

  // src/components/FloorPlan.tsx

    const getRoomDisplayName = (room: Room): string => {
      const area = room.width * room.height;
      const name = room.name;

      // Für sehr kleine Räume, Abkürzungen verwenden
      if (area < 2500) {
        if (name.toLowerCase().includes('phone booth')) return `PB ${name.split(' ').pop()}`;
        if (name.toLowerCase().includes('focus pod')) return `Pod ${name.split(' ').pop()}`;
        if (name.toLowerCase().includes('interview room')) return `IV ${name.split(' ').pop()}`;
        if (name.toLowerCase().includes('executive office')) return `Exec ${name.split(' ').pop()}`;
        // HINZUGEFÜGT: Regel für Café Meeting
        if (name.toLowerCase().includes('café meeting')) return `Café ${name.split(' ').pop()}`;
        return name.split(' ')[0];
      }

      // Für mittelgroße Räume, Namen kürzen
      if (name.length > 15 && room.width < 100) {
         const words = name.split(' ');
         if (words.length > 2) {
           return words.slice(0, 2).join(' ');
         }
      }

      return name; // Voller Name für große Räume
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
              style={{backgroundColor: 'hsl(var(--background))'}}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>

            {/* Main Corridor Separator */}
            <g>
              <rect
                  x="50"
                  y="250"
                  width="585"
                  height="2"
                  className="fill-gray-300/50"
                  rx="1"
              />
              <text
                  x="342.5"
                  y="260" // Nach unten verschoben für mehr Abstand
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="fill-gray-500 text-[10px] font-semibold tracking-widest"
              >
                MAIN CORRIDOR
              </text>
            </g>
            {/* Rooms */}
            {rooms.map((room) => (
                <g key={room.id}
                   onClick={() => onRoomSelect(room)}
                   onMouseEnter={() => setHoveredRoom(room.id)}
                   onMouseLeave={() => setHoveredRoom(null)}
                   className="cursor-pointer"
                >
                  <rect
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      className={cn(
                          getStatusColor(room.status),
                          'transition-all duration-300',
                          selectedRoom?.id === room.id
                              ? 'stroke-primary stroke-[3px]'
                              : getStatusBorderColor(room.status) + ' stroke-2',
                          hoveredRoom === room.id && 'brightness-125'
                      )}
                      rx="6"
                  />

                  // Innerhalb der rooms.map-Schleife in FloorPlan.tsx

                  <foreignObject
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      className="pointer-events-none"
                  >
                    <div className={cn(
                        "w-full h-full flex flex-col items-center justify-center text-center p-1 text-white font-bold overflow-hidden",
                        getTextSize(room)
                    )}
                         style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}
                    >
                      {/* HIER IST DIE ÄNDERUNG: getRoomDisplayName verwenden */}
                      <span>{getRoomDisplayName(room)}</span>

                      {shouldShowCapacity(room) && (
                          <span className="mt-1 opacity-90 flex items-center">
                          <Users className="w-3 h-3 mr-1"/> {room.capacity}
                        </span>
                      )}
                    </div>
                  </foreignObject>
                </g>
            ))}

            {/* Legend */}

          </svg>
          {/* Status Legend (HTML) */}
          <div className="mt-4 px-2 py-3 rounded-lg bg-card border border-border flex items-center justify-start gap-x-6">
            <h4 className="text-sm font-semibold text-foreground pl-2">Status Legend:</h4>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-800"></div>
                <span className="text-xs text-muted-foreground">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-800"></div>
                <span className="text-xs text-muted-foreground">Partial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                <span className="text-xs text-muted-foreground">Maintenance</span>
              </div>
            </div>
          </div>
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