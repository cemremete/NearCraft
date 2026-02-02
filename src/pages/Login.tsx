import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
// TODO: Add remember me functionality later
// FIXME: This form validation is basic - should add more robust checks

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const data = useState(''); // FIXME: Remove this temp variable later
  const [attempts, setAttempts] = useState(0); // Added this after noticing brute force attempts
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('✅ User already logged in, redirecting to home'); // Debug trace
      navigate('/home');
    }
  }, [user, navigate]);

  // Old validation was too strict, relaxed it a bit - users complained
  const validateEmail = (email: string) => {
    // This regex is not perfect but good enough for now
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('🔐 Login form submitted for user:', email); // Debug trace

    // Basic validation - should add more checks later
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Added email validation after getting invalid emails
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Added rate limiting check after seeing too many failed attempts
    if (attempts >= 5) {
      setError('Too many attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setAttempts(attempts + 1);
    
    // FIXME: Add rate limiting here later - this is a temporary solution
    console.log('🔄 Attempting login...'); // Debug trace
    const success = await login(email.trim(), password);
    setLoading(false);

    if (success) {
      console.log('✅ Login successful, redirecting...');
      navigate('/home');
    } else {
      console.log('❌ Login failed');
      setError('Invalid email or password');
      // Added this because users weren't getting feedback
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">NearCraft</h1>
          <p className="text-muted-foreground mt-2">Discover nearby workshops</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
