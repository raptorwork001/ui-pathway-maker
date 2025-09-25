import { Users, GraduationCap, Briefcase, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UserRoleSelectorProps {
  selectedRole: 'student' | 'staff' | 'outsider' | 'admin';
  onRoleChange: (role: 'student' | 'staff' | 'outsider' | 'admin') => void;
}

export const UserRoleSelector = ({ selectedRole, onRoleChange }: UserRoleSelectorProps) => {
  const roles = [
    {
      id: 'student' as const,
      title: 'NITC Student',
      description: 'Current students of NITC',
      icon: GraduationCap,
      benefits: ['Auto-approval', 'Same-day booking', 'No manual review'],
      color: 'primary'
    },
    {
      id: 'staff' as const,
      title: 'NITC Staff',
      description: 'Faculty and staff members',
      icon: Briefcase,
      benefits: ['Auto-approval', 'Priority slots', 'Instant confirmation'],
      color: 'primary'
    },
    {
      id: 'outsider' as const,
      title: 'External Visitor',
      description: 'Non-NITC individuals',
      icon: Users,
      benefits: ['Manual review', '2-day advance', 'Approval required'],
      color: 'pending'
    },
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'Director/Assistant',
      icon: Shield,
      benefits: ['Full control', 'Manage requests', 'Calendar control'],
      color: 'secondary'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Your Role</h2>
        <p className="text-muted-foreground">
          Choose your role to see the appropriate workflow and booking process
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-workflow ${
              selectedRole === role.id
                ? 'border-2 border-primary shadow-workflow scale-105'
                : 'border hover:border-primary/50'
            }`}
            onClick={() => onRoleChange(role.id)}
          >
            <CardContent className="p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                selectedRole === role.id
                  ? role.color === 'primary'
                    ? 'bg-primary text-primary-foreground'
                    : role.color === 'secondary'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-pending text-pending-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <role.icon className="h-6 w-6" />
              </div>
              
              <h3 className={`font-semibold mb-2 ${
                selectedRole === role.id ? 'text-primary' : 'text-foreground'
              }`}>
                {role.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {role.description}
              </p>
              
              <div className="space-y-1">
                {role.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      selectedRole === role.id
                        ? role.color === 'primary'
                          ? 'bg-primary/10 text-primary'
                          : role.color === 'secondary'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-pending/10 text-pending'
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};