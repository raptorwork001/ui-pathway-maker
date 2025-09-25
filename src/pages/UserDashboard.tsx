import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, LogOut, Plus, Edit, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { AppointmentForm } from '@/components/AppointmentForm';

const UserDashboard = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const userAppointments = [
    {
      id: '1',
      title: 'Meeting with Director',
      date: 'Tomorrow, 2:00 PM',
      status: 'approved',
      purpose: 'Project Discussion'
    },
    {
      id: '2',
      title: 'Research Proposal',
      date: 'Dec 28, 10:30 AM',
      status: 'pending',
      purpose: 'PhD Proposal Review'
    },
    {
      id: '3',
      title: 'Academic Query',
      date: 'Dec 30, 3:00 PM',
      status: 'rejected',
      purpose: 'Course Registration'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">SchedulEase</h1>
            <p className="text-sm text-muted-foreground">Student Dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto p-4 flex-col gap-2 hero-button"
              onClick={() => setShowBookingForm(true)}
            >
              <Plus className="h-6 w-6" />
              <span>Book New Appointment</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Edit className="h-6 w-6" />
              <span>Reschedule Appointment</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <X className="h-6 w-6" />
              <span>Cancel Appointment</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Appointments */}
          <Card className="workflow-card">
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>Your upcoming and recent appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium">{appointment.title}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">{appointment.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`status-badge ${
                        appointment.status === 'approved' ? 'status-approved' :
                        appointment.status === 'pending' ? 'status-pending animate-status-pulse' :
                        'status-rejected'
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                    {appointment.status === 'approved' && (
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    )}
                    {appointment.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="workflow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Available Slots
              </CardTitle>
              <CardDescription>
                Select from available appointment times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar 
                userRole="student"
                onSlotSelect={(slot) => {
                  console.log('Selected slot:', slot);
                  setShowBookingForm(true);
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="workflow-card animate-calendar-pop">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary font-medium">+2</span> this month
              </p>
            </CardContent>
          </Card>

          <Card className="workflow-card animate-calendar-pop" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary font-medium">Awaiting</span> approval
              </p>
            </CardContent>
          </Card>

          <Card className="workflow-card animate-calendar-pop" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary font-medium">11/12</span> approved
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showBookingForm && (
        <AppointmentForm 
          userRole="student"
          onClose={() => setShowBookingForm(false)}
          onSubmit={(data) => {
            console.log('Appointment data:', data);
            setShowBookingForm(false);
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;