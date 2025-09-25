import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Shield, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - store role in localStorage for demo
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
          <p className="text-white/80">Sign in to your account</p>
        </div>

        <Card className="workflow-card">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Choose your account type and sign in
            </CardDescription>
            
            {/* Role Selection */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedRole('user')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'user'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="h-4 w-4" />
                Regular User
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Shield className="h-4 w-4" />
                Administrator
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs">
                    <Badge variant="outline" className="text-xs mb-1">User</Badge>
                    <p>user@nitc.ac.in</p>
                    <p>password123</p>
                  </div>
                  <div className="text-xs">
                    <Badge variant="outline" className="text-xs mb-1">Admin</Badge>
                    <p>admin@nitc.ac.in</p>
                    <p>admin123</p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full hero-button">
                Sign In as {selectedRole === 'admin' ? 'Administrator' : 'User'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;