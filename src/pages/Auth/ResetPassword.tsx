
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSent(true);
      toast({
        title: "Reset email sent! 📧",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error) {
      toast({
        title: "Failed to send reset email",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen cemetery-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-6xl block mb-4">📧</span>
            <h1 className="font-creepster text-3xl text-primary glow-text mb-2">
              Check Your Email
            </h1>
            <p className="text-muted-foreground">
              We've sent password reset instructions to {email}
            </p>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 tombstone-shadow">
            <CardContent className="pt-6 text-center">
              <p className="text-foreground mb-6">
                Click the link in your email to reset your password. 
                If you don't see it, check your spam folder.
              </p>
              
              <Link to="/login">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Back to Login
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => setSent(false)}
              >
                Send Another Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cemetery-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4 float-animation">🔑</span>
          <h1 className="font-creepster text-3xl text-primary glow-text mb-2">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50 tombstone-shadow">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Password Reset</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                  placeholder="your@email.com"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Reset Email...
                  </>
                ) : (
                  'Send Reset Email'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-muted-foreground hover:text-primary inline-flex items-center text-sm"
              >
                <ArrowLeft className="mr-1 w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
