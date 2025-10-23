import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Shield, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: string) => {
    // Mock OAuth login - in production this would redirect to OAuth provider
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isLoggedIn', 'true');
    
    if (selectedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm text-white">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-medium">NITC Director's Office</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SchedulEase</h1>
          <p className="text-white/80">Sign in to continue</p>
        </div>

        <Card className="workflow-card">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl">Welcome</CardTitle>
            <CardDescription className="text-center">
              Choose your role and sign in with your account
            </CardDescription>
            
            {/* Role Selection */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedRole('user')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'user'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="h-4 w-4" />
                User
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Shield className="h-4 w-4" />
                Admin
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* OAuth Login Buttons */}
            <Button
              onClick={() => handleOAuthLogin('google')}
              variant="outline"
              className="w-full h-12 gap-3 text-base font-medium"
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>

            <Button
              onClick={() => handleOAuthLogin('microsoft')}
              variant="outline"
              className="w-full h-12 gap-3 text-base font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 21 21" fill="currentColor">
                <path d="M0 0h10v10H0V0zm11 0h10v10H11V0zM0 11h10v10H0V11zm11 0h10v10H11V11z"/>
              </svg>
              Continue with Microsoft
            </Button>

            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                DEMO MODE
              </span>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Click any button above to demo as <span className="font-semibold text-foreground">{selectedRole === 'admin' ? 'Administrator' : 'Regular User'}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;