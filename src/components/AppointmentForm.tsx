import { useState } from 'react';
import { X, User, Mail, MessageSquare, Clock, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface AppointmentFormProps {
  userRole: 'student' | 'staff' | 'outsider' | 'admin';
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AppointmentForm = ({ userRole, onClose, onSubmit }: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    meetingType: '',
    duration: '',
    purpose: '',
    agenda: '',
    documents: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const getFormTitle = () => {
    switch (userRole) {
      case 'student':
        return 'Book Appointment - NITC Student';
      case 'staff':
        return 'Book Appointment - NITC Staff';
      case 'outsider':
        return 'Request Appointment - External Visitor';
      case 'admin':
        return 'Schedule Appointment - Admin';
      default:
        return 'Book Appointment';
    }
  };

  const getApprovalMessage = () => {
    if (userRole === 'student' || userRole === 'staff') {
      return {
        type: 'approved',
        message: 'Your appointment will be automatically approved if the time slot is available.'
      };
    } else {
      return {
        type: 'pending',
        message: 'Your request will be reviewed by the Director or Administrative Assistant.'
      };
    }
  };

  const approvalInfo = getApprovalMessage();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-calendar-pop">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-xl">{getFormTitle()}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={`status-badge ${
                approvalInfo.type === 'approved' ? 'status-approved' : 'status-pending'
              }`}>
                {approvalInfo.type === 'approved' ? 'Auto-Approval' : 'Manual Review'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {approvalInfo.message}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="flex items-center gap-2 font-semibold mb-4">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>

                {userRole === 'outsider' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        placeholder="Company/Institution name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="designation">Designation/Role</Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        placeholder="Your position or role"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="form-section">
              <h3 className="flex items-center gap-2 font-semibold mb-4">
                <Clock className="h-5 w-5 text-secondary" />
                Meeting Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meetingType">Meeting Type *</Label>
                  <Select value={formData.meetingType} onValueChange={(value) => handleInputChange('meetingType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic Discussion</SelectItem>
                      <SelectItem value="research">Research Proposal</SelectItem>
                      <SelectItem value="administrative">Administrative Matter</SelectItem>
                      <SelectItem value="grievance">Grievance</SelectItem>
                      <SelectItem value="project">Project Review</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Preferred Duration *</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="purpose">Purpose of Meeting *</Label>
                  <Input
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    placeholder="Brief summary of the meeting purpose"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section">
              <h3 className="flex items-center gap-2 font-semibold mb-4">
                <MessageSquare className="h-5 w-5 text-pending" />
                Additional Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agenda">Meeting Agenda *</Label>
                  <Textarea
                    id="agenda"
                    value={formData.agenda}
                    onChange={(e) => handleInputChange('agenda', e.target.value)}
                    placeholder="Detailed agenda or points to be discussed..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="documents">Documents/Materials</Label>
                  <Textarea
                    id="documents"
                    value={formData.documents}
                    onChange={(e) => handleInputChange('documents', e.target.value)}
                    placeholder="List any documents or materials you'll bring or need..."
                    rows={2}
                  />
                </div>

                {userRole === 'outsider' && (
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Request Priority</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="normal">Normal - Standard meeting</SelectItem>
                        <SelectItem value="high">High - Important matter</SelectItem>
                        <SelectItem value="urgent">Urgent - Time-sensitive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Submission */}
            <div className="form-section">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Important Notes:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {userRole === 'student' || userRole === 'staff' ? (
                      <>
                        <li>• Appointments are automatically approved if slot is available</li>
                        <li>• You can book until 5:00 PM for the next day</li>
                        <li>• Limit of one appointment per day</li>
                        <li>• Please arrive 5 minutes before your scheduled time</li>
                      </>
                    ) : (
                      <>
                        <li>• External requests require manual approval</li>
                        <li>• Book at least 2 days in advance</li>
                        <li>• Approval decision will be sent via email</li>
                        <li>• Bring valid ID and relevant documents</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 hero-button"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {userRole === 'outsider' ? 'Submit Request' : 'Book Appointment'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};