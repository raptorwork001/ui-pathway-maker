import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TimeSlot {
  time: string;
  available: boolean;
  duration: string;
  type: 'meeting' | 'consultation' | 'review';
}

interface CalendarDay {
  date: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  slots: TimeSlot[];
}

interface AppointmentCalendarProps {
  userRole: 'student' | 'staff' | 'outsider' | 'admin';
  onSlotSelect: (slot: { date: number; time: string; type: string }) => void;
}

export const AppointmentCalendar = ({ userRole, onSlotSelect }: AppointmentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const generateTimeSlots = (date: number): TimeSlot[] => {
    const slots: TimeSlot[] = [
      { time: '09:00', available: true, duration: '30 min', type: 'meeting' },
      { time: '09:30', available: false, duration: '30 min', type: 'consultation' },
      { time: '10:00', available: true, duration: '60 min', type: 'review' },
      { time: '11:00', available: true, duration: '30 min', type: 'meeting' },
      { time: '11:30', available: date % 3 === 0, duration: '30 min', type: 'consultation' },
      { time: '14:00', available: true, duration: '45 min', type: 'review' },
      { time: '14:45', available: date % 2 === 0, duration: '30 min', type: 'meeting' },
      { time: '15:30', available: true, duration: '30 min', type: 'consultation' },
      { time: '16:00', available: date % 4 !== 0, duration: '60 min', type: 'review' },
    ];

    // Restrict availability based on user role
    if (userRole === 'outsider') {
      // Outsiders can only book 2+ days in advance
      const today = new Date().getDate();
      if (date <= today + 1) {
        return slots.map(slot => ({ ...slot, available: false }));
      }
    } else {
      // NITC users cannot book same day after 5 PM
      const today = new Date().getDate();
      const currentHour = new Date().getHours();
      if (date === today && currentHour >= 17) {
        return slots.map(slot => ({ ...slot, available: false }));
      }
    }

    return slots;
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 42); // 6 weeks

    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      const dayNumber = date.getDate();
      const isCurrentMonth = date.getMonth() === month;
      const isToday = dayNumber === today && date.getMonth() === currentMonth && date.getFullYear() === currentYear;

      days.push({
        date: dayNumber,
        isToday,
        isCurrentMonth,
        slots: isCurrentMonth ? generateTimeSlots(dayNumber) : []
      });
    }

    return days;
  };

  const days = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDate(null);
  };

  const getSlotTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'consultation':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'review':
        return 'bg-pending/10 text-pending border-pending/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[80px] p-1 border rounded-lg cursor-pointer transition-all duration-200 ${
              day.isCurrentMonth
                ? day.isToday
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card border-border hover:border-primary/50'
                : 'bg-muted/30 border-muted'
            } ${selectedDate === day.date ? 'ring-2 ring-primary shadow-md' : ''}`}
            onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
          >
            <div className={`text-sm font-medium mb-1 ${
              day.isCurrentMonth 
                ? day.isToday 
                  ? 'text-primary' 
                  : 'text-foreground'
                : 'text-muted-foreground'
            }`}>
              {day.date}
            </div>
            
            {day.isCurrentMonth && (
              <div className="space-y-1">
                {day.slots.slice(0, 2).map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className={`calendar-slot text-xs p-1 rounded border ${
                      slot.available 
                        ? 'available cursor-pointer'
                        : 'booked opacity-50 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (slot.available) {
                        onSlotSelect({ date: day.date, time: slot.time, type: slot.type });
                      }
                    }}
                  >
                    {slot.time}
                  </div>
                ))}
                {day.slots.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{day.slots.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time Slots for Selected Date */}
      {selectedDate && (
        <div className="space-y-4 animate-calendar-pop">
          <h4 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available Times - {monthNames[currentDate.getMonth()]} {selectedDate}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {generateTimeSlots(selectedDate).map((slot, index) => (
              <Button
                key={index}
                variant={slot.available ? "outline" : "secondary"}
                disabled={!slot.available}
                className={`h-auto p-3 ${slot.available ? 'hover:border-primary' : ''}`}
                onClick={() => slot.available && onSlotSelect({ 
                  date: selectedDate, 
                  time: slot.time, 
                  type: slot.type 
                })}
              >
                <div className="text-center">
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-xs text-muted-foreground">{slot.duration}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs mt-1 ${getSlotTypeColor(slot.type)}`}
                  >
                    {slot.type}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>

          {/* Booking Rules */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Booking Rules</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {userRole === 'student' || userRole === 'staff' ? (
                <>
                  <li>• Auto-approval for NITC members</li>
                  <li>• Book until 5:00 PM for next day</li>
                  <li>• One appointment per day limit</li>
                </>
              ) : (
                <>
                  <li>• Manual approval required</li>
                  <li>• Book at least 2 days in advance</li>
                  <li>• Provide meeting agenda</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};