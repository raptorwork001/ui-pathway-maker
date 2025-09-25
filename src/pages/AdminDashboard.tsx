import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  LogOut, 
  Users, 
  Shield, 
  Filter,
  Eye,
  Check,
  X,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const pendingRequests = [
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      type: 'External Visitor',
      purpose: 'Industry Collaboration Discussion',
      requestedDate: 'Dec 28, 2024',
      requestedTime: '2:00 PM',
      submittedAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'Dr. Priya Nair',
      email: 'priya@company.com',
      type: 'External Visitor',
      purpose: 'Research Partnership Proposal',
      requestedDate: 'Dec 30, 2024',
      requestedTime: '10:30 AM',
      submittedAt: '5 hours ago'
    },
    {
      id: '3',
      name: 'Ankit Kumar',
      email: 'ankit.staff@nitc.ac.in',
      type: 'Staff',
      purpose: 'Budget Discussion',
      requestedDate: 'Jan 2, 2025',
      requestedTime: '11:00 AM',
      submittedAt: '1 day ago'
    }
  ];

  const upcomingAppointments = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'Student',
      purpose: 'Thesis Defense Approval',
      date: 'Today',
      time: '3:00 PM',
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      type: 'Staff',
      purpose: 'Department Meeting',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'confirmed'
    }
  ];

  const stats = [
    { title: 'Pending Requests', value: '8', icon: Clock, trend: '+3 today', color: 'text-orange-500' },
    { title: 'Today\'s Appointments', value: '4', icon: Calendar, trend: '2 remaining', color: 'text-blue-500' },
    { title: 'Approved This Week', value: '24', icon: CheckCircle2, trend: '+12%', color: 'text-green-500' },
    { title: 'Total Users', value: '156', icon: Users, trend: '+8 new', color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">SchedulEase Admin</h1>
            <p className="text-sm text-muted-foreground">Director's Office Administration</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Administrator
            </Badge>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="workflow-card animate-calendar-pop" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-secondary font-medium">{stat.trend}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Pending Requests</TabsTrigger>
            <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
            <TabsTrigger value="calendar">Director's Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Appointment Requests</h2>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="external">External Visitors</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="workflow-card">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                      <div>
                        <h4 className="font-semibold">{request.name}</h4>
                        <p className="text-sm text-muted-foreground">{request.email}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {request.type}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm">{request.purpose}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Requested: {request.requestedDate} at {request.requestedTime}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted: {request.submittedAt}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <h2 className="text-xl font-semibold">Today's Appointments</h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="workflow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{appointment.name}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.purpose}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{appointment.type}</Badge>
                          <Badge className="status-badge status-approved">
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Director's Schedule Management</h2>
              <Button className="hero-button">
                <Plus className="h-4 w-4 mr-2" />
                Block Time Slot
              </Button>
            </div>
            
            <Card className="workflow-card">
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
                <CardDescription>
                  Manage the Director's availability for appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                    <div key={time} className="p-3 border rounded-lg flex items-center justify-between">
                      <span className="font-medium">{time}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          Available
                        </Button>
                        <Button size="sm" variant="destructive">
                          Block
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics & Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="workflow-card">
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Requests</span>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved</span>
                      <span className="font-medium text-green-600">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rejected</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending</span>
                      <span className="font-medium text-orange-600">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="workflow-card">
                <CardHeader>
                  <CardTitle>User Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Students</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>External Visitors</span>
                      <span className="font-medium">6</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;