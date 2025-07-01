
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">💀</span>
            <div className="font-creepster text-xl text-primary group-hover:glow-text transition-all duration-300">
              Internet Graveyard
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/graveyard" className="text-foreground/80 hover:text-primary transition-colors">
              Browse Graves
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/bury" className="text-foreground/80 hover:text-primary transition-colors">
                  🪦 Bury Something
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {user.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-foreground/80 hover:text-accent"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground/80 hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Join the Graveyard
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/graveyard" 
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Graves
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/bury" 
                    className="text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪦 Bury Something
                  </Link>
                  <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Signed in as: {user.email}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-accent hover:text-accent/80 justify-start p-0"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Join the Graveyard
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
