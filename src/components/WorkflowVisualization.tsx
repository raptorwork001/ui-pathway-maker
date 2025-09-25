import { CheckCircle2, Clock, Users, UserCheck, Shield, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'active' | 'pending';
  userTypes: string[];
}

interface WorkflowVisualizationProps {
  userRole: 'student' | 'staff' | 'outsider' | 'admin';
}

export const WorkflowVisualization = ({ userRole }: WorkflowVisualizationProps) => {
  const getWorkflowSteps = (): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      {
        id: 'select',
        title: 'Select Time Slot',
        description: 'Choose an available appointment time from the calendar',
        icon: Clock,
        status: 'completed',
        userTypes: ['all']
      },
      {
        id: 'details',
        title: 'Provide Details',
        description: 'Fill in meeting purpose, agenda, and personal information',
        icon: Users,
        status: 'completed',
        userTypes: ['all']
      }
    ];

    if (userRole === 'student' || userRole === 'staff') {
      return [
        ...baseSteps,
        {
          id: 'auto-approve',
          title: 'Auto-Approval',
          description: 'NITC members get automatic approval if slot is available',
          icon: CheckCircle2,
          status: 'active',
          userTypes: ['student', 'staff']
        },
        {
          id: 'confirmed',
          title: 'Confirmation',
          description: 'Email confirmation sent. Appointment is scheduled!',
          icon: Send,
          status: 'pending',
          userTypes: ['student', 'staff']
        }
      ];
    } else if (userRole === 'outsider') {
      return [
        ...baseSteps,
        {
          id: 'pending',
          title: 'Pending Review',
          description: 'External requests require manual approval from Director/Assistant',
          icon: Clock,
          status: 'active',
          userTypes: ['outsider']
        },
        {
          id: 'approval',
          title: 'Admin Decision',
          description: 'Director or Assistant reviews and approves/rejects request',
          icon: Shield,
          status: 'pending',
          userTypes: ['outsider']
        },
        {
          id: 'notification',
          title: 'Final Status',
          description: 'Email notification sent with approval decision',
          icon: Send,
          status: 'pending',
          userTypes: ['outsider']
        }
      ];
    } else {
      return [
        {
          id: 'review',
          title: 'Review Requests',
          description: 'View all pending appointment requests from external users',
          icon: Users,
          status: 'completed',
          userTypes: ['admin']
        },
        {
          id: 'evaluate',
          title: 'Evaluate Request',
          description: 'Check meeting purpose, user credentials, and availability',
          icon: UserCheck,
          status: 'active',
          userTypes: ['admin']
        },
        {
          id: 'decision',
          title: 'Make Decision',
          description: 'Approve or reject the appointment request',
          icon: Shield,
          status: 'pending',
          userTypes: ['admin']
        },
        {
          id: 'notify',
          title: 'Send Notification',
          description: 'User receives email with decision and next steps',
          icon: Send,
          status: 'pending',
          userTypes: ['admin']
        }
      ];
    }
  };

  const steps = getWorkflowSteps();

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-approved';
      case 'active':
        return 'status-pending';
      case 'pending':
        return 'status-badge';
      default:
        return 'status-badge';
    }
  };

  const getUserRoleInfo = () => {
    switch (userRole) {
      case 'student':
        return {
          title: 'NITC Student Workflow',
          description: 'Streamlined process with automatic approval for NITC students',
          color: 'text-primary'
        };
      case 'staff':
        return {
          title: 'NITC Staff Workflow',
          description: 'Fast-track approval process for faculty and staff members',
          color: 'text-primary'
        };
      case 'outsider':
        return {
          title: 'External Visitor Workflow',
          description: 'Manual review process to ensure proper screening of external requests',
          color: 'text-pending'
        };
      case 'admin':
        return {
          title: 'Administrative Workflow',
          description: 'Director and Assistant workflow for managing external requests',
          color: 'text-secondary'
        };
      default:
        return {
          title: 'Appointment Workflow',
          description: 'General appointment booking process',
          color: 'text-foreground'
        };
    }
  };

  const roleInfo = getUserRoleInfo();

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <div className="text-center">
        <h3 className={`text-xl font-semibold ${roleInfo.color} mb-2`}>
          {roleInfo.title}
        </h3>
        <p className="text-muted-foreground">
          {roleInfo.description}
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 relative">
              <div className="workflow-step">
                <Card className={`border-2 transition-all duration-500 ${
                  step.status === 'active' 
                    ? 'border-primary shadow-workflow' 
                    : step.status === 'completed'
                    ? 'border-approved'
                    : 'border-border'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      step.status === 'completed' 
                        ? 'bg-approved text-approved-foreground'
                        : step.status === 'active'
                        ? 'bg-primary text-primary-foreground animate-status-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <Badge className={`status-badge ${getStepStatusColor(step.status)}`}>
                      {step.status === 'completed' ? 'Complete' : 
                       step.status === 'active' ? 'Current' : 'Next'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
              
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="workflow-connector hidden lg:block">
                  <div className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-secondary border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process Summary */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-5 w-5 text-secondary" />
          <span className="font-medium">Process Summary</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {userRole === 'student' || userRole === 'staff' 
            ? 'As a NITC member, your appointments are automatically approved if the time slot is available. You can book up until 5:00 PM the day before.'
            : userRole === 'outsider'
            ? 'External visitors must request appointments at least 2 days in advance. All requests require manual approval from the Director or Administrative Assistant.'
            : 'As an administrator, you have full control over appointment approvals and can manage the Director\'s calendar availability.'
          }
        </p>
      </div>
    </div>
  );
};