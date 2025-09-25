import { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, UserCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkflowVisualization } from '@/components/WorkflowVisualization';
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { UserRoleSelector } from '@/components/UserRoleSelector';
import { AppointmentForm } from '@/components/AppointmentForm';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'staff' | 'outsider' | 'admin'>('student');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const stats = [
    { title: 'Total Appointments', value: '24', icon: Calendar, trend: '+12%' },
    { title: 'Pending Approvals', value: '6', icon: Clock, trend: '+3' },
    { title: 'Approved Today', value: '8', icon: CheckCircle2, trend: '+2' },
    { title: 'Available Slots', value: '12', icon: Users, trend: '68%' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">NITC Director's Office</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 animate-workflow-slide">
              SchedulEase
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Streamlined appointment scheduling system for NITC Director's office. 
              Book meetings efficiently with automated workflows for students, staff, and external visitors.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                className="hero-button"
                onClick={() => window.location.href = '/login'}
              >
                Get Started
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Role Selection */}
        <div className="mb-8">
          <UserRoleSelector 
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
          />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="workflow-card animate-calendar-pop" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-secondary font-medium">{stat.trend}</span> from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Visualization */}
        <div className="mb-8">
          <Card className="workflow-card">
            <CardHeader>
              <CardTitle className="gradient-text">Appointment Workflow</CardTitle>
              <CardDescription>
                Understanding the approval process for different user types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkflowVisualization userRole={selectedRole} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
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
                userRole={selectedRole}
                onSlotSelect={(slot) => {
                  console.log('Selected slot:', slot);
                  setShowBookingForm(true);
                }}
              />
            </CardContent>
          </Card>

          {/* Status & Quick Actions */}
          <div className="space-y-6">
            <Card className="workflow-card">
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>Recent booking status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Meeting with Director</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                  </div>
                  <Badge className="status-badge status-approved">Approved</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Project Discussion</p>
                    <p className="text-sm text-muted-foreground">Dec 28, 10:30 AM</p>
                  </div>
                  <Badge className="status-badge status-pending animate-status-pulse">Pending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Research Proposal</p>
                    <p className="text-sm text-muted-foreground">Dec 30, 3:00 PM</p>
                  </div>
                  <Badge className="status-badge status-rejected">Rejected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="workflow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => setShowBookingForm(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  View My Bookings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Reschedule Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showBookingForm && (
        <AppointmentForm 
          userRole={selectedRole}
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

export default Index;